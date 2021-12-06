variable "flavor" { default = "m1.small" }
variable "image1" { default = "CentOS 7 1901" }
variable "image2" { default = "Debian Stretch" }
variable "instance" { default = "tf_instance" }
variable "keypair" { default = "TeamCity" } # you need to change this
variable "pool" { default = "cscloud_private_floating" }
variable "server1_script" { default = "./server1.sh" }
variable "security_description" { default = "Terraform security group" }
variable "security_name" { default = "tf_security" }
