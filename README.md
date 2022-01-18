# up940148-PaaS

This repository contains the files necessary to create a counting API that stores register values in Google Cloud's Datastore

## Installation

*This API is designed to run on a Google Cloud App Engine Service*

First, create a Compute Engine VM instance. A sample script for creation has been provided in `create-paas-instance.sh`, then SSH into the created instance. Install Node and Git, then clone and install this repository inside the VM.

```sh
# Install Node and Git
curl -fsSL https://deb.nodesource.com/setup_17.x | sudo bash -
sudo apt-get install -y nodejs
sudo apt-get install -y git

# Clone repository
git clone https://github.com/UP940148/up940148-PaaS
cd up940148-PaaS

# Install Repository Dependencies
npm install
```

## Deployment

Once everything is installed simply deploy the app with `gcloud app deploy`. You will then be given a URL to access the API at.

The API will now be available for use at the specified URL on port 80.


## API Usage

All API routes use `content-type: text/plain` to send and receive information. Request bodies should be in the form of a single number

`:RegisterName` must always be an alphanumeric string.

* **GET** `/api/:RegisterName`
  * Retrieves value of `RegisterName`, or 0 if Register doesn't exist
  * Returns `200` with register value on success
  * Returns `500` if an error occurred

* **PUT** `/api/:RegisterName`
  * Requires a request body
  * Sets register to value specified in request body
  * If register doesn't exist, new register is created with specified value
  * Returns `200` with Register value on success
  * Returns `400` if request body is not valid
  * Returns `500` if an error occurred

* **POST** `/api/:RegisterName`
  * Requires a request body
  * Adds value specified in body to register's current value
  * If register doesn't exist, new register is created with specified value
  * Returns `200` with Register value on success
  * Returns `400` if request body is not valid
  * Returns `500` if an error occurred

* **DELETE** `/api/:RegisterName`
  * Deletes specified register
  * Returns `204` on success
  * Returns `500` if an error occurred
