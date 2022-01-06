gcloud config set compute/zone europe-west2-b
gcloud compute instances create \
--machine-type n2-highcpu-2 \
--scopes cloud-platform,datastore \
--tags http-server,https-server \
paas-instance

gcloud compute ssh paas-instance
