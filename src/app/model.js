var System = function (name) {
	this.name = name;
	this.clusters = [];
}

System.prototype.getAvailability = function getAvailability() {
	var result = 1;
	this.clusters.forEach(function (cl, i, arr) {
		result = result * cl.getAvailability();
	});
	return result;
}

var Cluster = function (id, code, name) {
	this.id = id;
	this.code = code;
	this.name = name;
	this.components = [];
}

Cluster.prototype.addComponent = function addComponent(component) {
	this.components.push(component);
}

Cluster.prototype.removeComponent = function removeComponent(component) {
	var i = this.components.indexOf(component);
	this.components.splice(i, 1);
}

Cluster.prototype.getAvailability = function getAvailability() {
	var result = 0;
	this.components.forEach(function (c, i, arr) {
		result = 1-((1-result) * (1-c.getAvailability()));
	});
	return result;
}

var Component = function (id, name, mttr, mtbf) {
	this.id = id;
	this.name = name;
	this.mttr = mttr;
	this.mtbf = mtbf;
}

Component.prototype.getAvailability = function getAvailability() {
	var result = this.mtbf / (this.mttr + this.mtbf);
	return result;
}

Component.prototype.getDowntime = function getDowntime() {
	return 0;
}

