#!/bin/bash

CURRENTPATH=$(pwd)

if [ -d "/terraform/conf" ]; then
  cd /terraform/conf
  source c1628725-openrc.sh
  terraform destroy -auto-approve
  cd ..
  rm conf -r
fi

cd $(echo "$CURRENTPATH")

cp conf /terraform -rf

cd conf

source c1628725-openrc.sh

terraform init

terraform plan

terraform apply -auto-approve