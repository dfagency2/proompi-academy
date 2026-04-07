#!/usr/bin/env bash
set -euo pipefail

# ============================================================
# Proompi Academy — Deploy to GCP Cloud Storage + CDN
# Usage: ./deploy.sh
#
# Prerequisites:
#   1. gcloud CLI authenticated (gcloud auth login)
#   2. GCP project set (gcloud config set project proompi-prod)
#   3. Cloud Storage bucket created (gs://academy-proompi-com)
#   4. Cloud CDN + Load Balancer pointing to bucket
#   5. DNS: academy.proompi.com CNAME → LB IP
# ============================================================

PROJECT_ID="proompi-prod"
BUCKET="gs://academy-proompi-com"
REGION="europe-central2"

echo "🏗  Building Proompi Academy..."
npm run build

echo "🚀 Syncing to Cloud Storage: $BUCKET"
gcloud storage rsync ./dist "$BUCKET" \
  --recursive \
  --delete-unmatched-destination-objects \
  --project="$PROJECT_ID"

echo "⚡ Setting cache headers for static assets..."
gcloud storage objects update "$BUCKET/**/*.js" \
  --cache-control="public, max-age=31536000, immutable" \
  --project="$PROJECT_ID" 2>/dev/null || true

gcloud storage objects update "$BUCKET/**/*.css" \
  --cache-control="public, max-age=31536000, immutable" \
  --project="$PROJECT_ID" 2>/dev/null || true

gcloud storage objects update "$BUCKET/**/*.html" \
  --cache-control="public, max-age=0, must-revalidate" \
  --project="$PROJECT_ID" 2>/dev/null || true

echo "🔄 Invalidating CDN cache..."
# Replace BACKEND_BUCKET_NAME with your actual backend bucket name
# gcloud compute url-maps invalidate-cdn-cache LOAD_BALANCER_NAME \
#   --path "/*" \
#   --project="$PROJECT_ID"
echo "   (Uncomment CDN invalidation line with your Load Balancer name)"

echo ""
echo "✅ Deploy complete!"
echo "   URL: https://academy.proompi.com"
echo ""
echo "📋 First-time setup checklist:"
echo "   □ Create bucket: gcloud storage buckets create $BUCKET --location=$REGION --uniform-bucket-level-access"
echo "   □ Make public: gcloud storage buckets add-iam-policy-binding $BUCKET --member=allUsers --role=roles/storage.objectViewer"
echo "   □ Set website config: gcloud storage buckets update $BUCKET --web-main-page-suffix=index.html --web-error-page=404.html"
echo "   □ Create Load Balancer with Cloud CDN → backend bucket"
echo "   □ Add SSL certificate for academy.proompi.com"
echo "   □ Point DNS: academy.proompi.com → LB IP"
