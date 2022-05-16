var miner0;
var reach = 0;


function say() {
    console.log('say hello')
}

module.exports = {
    spawnMiner : function(){
        say()
        console.log(Game.spawns['Spawn1'].energy)
		Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], 'miner_000',{ memory: { ResourceTargetTimes: 0 } });//cost 300
		if(Game.creeps['miner_000'] != null){
			mMiner0 = require("./miner");

			if(Game.creeps['miner_000'].harvest(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0]) == 0){
				Game.creeps['miner_000'].memory.ResourceTarget = Game.creeps['miner_000'].pos;
				if(Game.creeps['miner_000'].memory.ContainerTarget == null){
					mMiner0.findWayBack()
				}	
				else{
				    Game.spawns['Spawn1'].room.createConstructionSite(Game.creeps['miner_000'].memory.ContainerTarget.x, Game.creeps['miner_000'].memory.ContainerTarget.y, STRUCTURE_CONTAINER, 'Spawn1');
				    Game.creeps['miner_000'].build(Game.creeps['miner_000'].pos.findClosestByRange(FIND_CONSTRUCTION_SITES))
				    
				}
			}
			else{
				console.log(Game.creeps['miner_000'].room.find(FIND_SOURCES))
				
			}
			mMiner0.findWay()
			Game.creeps['miner_000'].memory.ResourceTargetTimes = 1

			return true;
		}
		return false;
		
    }
}