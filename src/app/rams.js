app.controller('RamsController', ['$scope', function($scope) {
	var self = this;
		
	self.system = new System('Thailand Modernized CNS/ATM System');
	self.system.clusters.push(new Cluster(1, 'S', 'Sensor Nodes'));
	self.system.clusters.push(new Cluster(2, 'C', 'Communication Nodes'));
	self.system.clusters.push(new Cluster(3, 'P', 'Processing Nodes'));
	self.system.clusters.push(new Cluster(4, 'D', 'Display Nodes'));
	
	self.addComponent = function (component, cluster) {
		var id = 0;
		
		if (cluster.components.length == 0)
			id = 1;
		else {
			var maxId = Math.max.apply(null, cluster.components.map(function(c) {
				return c.id;
			}));
			id = maxId + 1;
		}
		
		var cp = new Component(id, component.name, component.mttr, component.mtbf);
		cluster.addComponent(cp);
		
		component.id = null;
		component.name = '';
		component.mttr = null;
		component.mtbf = null;
	};
	
	self.removeComponent = function (component, cluster) {
		cluster.removeComponent(component);
	};
	
	self.printSysDowntime = function (availability) {
		var downtime = 365 * 24 * (1-availability); // in hours/year
		
		if (downtime >= 24) {
			downtime = downtime / 24;
			return downtime.toFixed(2) + ' day(s) per year';
		} else {
			if (downtime < 1) {
				downtime = downtime * 60;
				if (downtime < 1) {
					downtime = downtime * 60;
					if (downtime < 1) {
						downtime = downtime * 1000;
						return downtime.toFixed(2) + ' milli-seconds per year'
					} else {
						return downtime.toFixed(2) + ' seconds per year'
					}
				} else {
					return downtime.toFixed(2) + ' minutes per year'
				}
			} else {
				return downtime.toFixed(2) + ' hours per year'
			}
		}
	}
	
	$scope.$watch(
		'self.system.clusters',
		function handle (newValue, oldValue) {
			console.log('Changed');
		}
	);
	
	self.developerName = 'Paveen JUNTAMA : paveenju@aerothai.co.th';
}]);