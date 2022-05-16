




module.exports = {
    findWay : function(){
        console.log('here')
		//Game.creeps['miner_000'].move(Game.creeps['miner_000'].pos.getDirectionTo(ret.path[0]));
		console.log(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0].pos)
		Game.creeps['miner_000'].moveTo(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0].pos)
		return 
    },
	
	findWayBack : function(){
		ret = PathFinder.search(Game.creeps['miner_000'].pos, Game.creeps['miner_000'].room.find(FIND_SOURCES),    {
	  // We need to set the defaults costs higher so that we
	  // can set the road cost lower in `roomCallback`
	  plainCost: 2,
	  swampCost: 10,
	
	  roomCallback: function(roomName) {
	
	    let room = Game.rooms[roomName];
	    // In this example `room` will always exist, but since 
	    // PathFinder supports searches which span multiple rooms 
	    // you should be careful!
	    if (!room) return;
	    let costs = new PathFinder.CostMatrix;
	
	    room.find(FIND_STRUCTURES).forEach(function(struct) {
	      if (struct.structureType === STRUCTURE_ROAD) {
	        // Favor roads over plain tiles
	        costs.set(struct.pos.x, struct.pos.y, 1);
	      } else if (struct.structureType !== STRUCTURE_CONTAINER &&
	                 (struct.structureType !== STRUCTURE_RAMPART ||
	                  !struct.my)) {
	        // Can't walk through non-walkable buildings
	        costs.set(struct.pos.x, struct.pos.y, 0xff);
	      }
	    });
	
	    // Avoid creeps in the room
	    room.find(FIND_CREEPS).forEach(function(creep) {
	      costs.set(creep.pos.x, creep.pos.y, 0xff);
	    });
	
	    return costs;
	  },
	})
		console.log(ret.path[0])
		Game.creeps['miner_000'].memory.ContainerTarget = ret.path[0]
		
		return 
	}
	
		

}