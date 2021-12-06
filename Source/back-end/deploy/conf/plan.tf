resource "openstack_compute_secgroup_v2" "security_group" {
  name        = "${var.security_name}"
  description = "${var.security_description}"
  rule {
    from_port   = 22
    to_port     = 22
    ip_protocol = "tcp"
    cidr        = "0.0.0.0/0"
  }
  rule {
    from_port   = 8080
    to_port     = 8080
    ip_protocol = "tcp"
    cidr        = "0.0.0.0/0"
  }
}

resource "openstack_compute_instance_v2" "instance_1" {
  name            = "server1_instance"
  image_name      = "${var.image1}"
  flavor_name     = "${var.flavor}"
  security_groups = ["${openstack_compute_secgroup_v2.security_group.name}"]
  key_pair        = "${var.keypair}"
  user_data       = "${file("${var.server1_script}")}"
}

resource "openstack_compute_floatingip_associate_v2" "floating_ip_1" {
  floating_ip = "10.72.96.87"
  instance_id = "${openstack_compute_instance_v2.instance_1.id}"
}