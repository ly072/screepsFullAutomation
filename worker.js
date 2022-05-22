




module.exports = {

	init

	
		

}

function init(creepName,Strategy){
	console.log("miner正在初始化")
	console.log('该房间有' + Game.spawns['Spawn1'].room.find(FIND_SOURCES).length + '个矿点')
	console.log('该房间controller' + getControllerPos(Game.spawns['Spawn1'].room) + '地点')
	// for(a in Game.creeps['miner_000'].room.find(FIND_SOURCES)){
		
	// }
	if(Strategy == 'Mine'){
		SourceMine()
	}else if(Strategy == 'Build'){
		console.log('dig'+creepName)
		SourceBuild()
	}
	
	
	
	
	
	
}


function SourceBuild(){


	if(Game.creeps[creepName].store.getUsedCapacity() == 0){
		Game.creeps[creepName].memory.fullSign = 0;//没有货物
	}
	if(Game.creeps[creepName].store.getFreeCapacity() == 0){
		Game.creeps[creepName].memory.fullSign = 1;//没有空余空间
		if(Game.creeps[creepName].memory.roadSign == 0){
			Game.creeps[creepName].memory.roadSign = 1
		}
	}

	
	
	
	if(Game.creeps[creepName].memory.fullSign == 0){
		
		workMine(Game.creeps[creepName].room.find(FIND_SOURCES)[1], creepName)
	}
	else{
		const extensions = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
			/* 这是一个过滤器，过滤建筑，返回建筑类型是扩容器或者虫巢，条件是未满载的*/
			filter: (structure) => {
				return (structure.structureType == STRUCTURE_EXTENSION && structure.energy !=50);
			}
		});
		if(extensions.length != 0){
			console.log('true'+creepName)
			Game.creeps[creepName].moveTo(extensions[0])
			Game.creeps[creepName].transfer(extensions[0],RESOURCE_ENERGY)
		}else{
			const target = Game.creeps[creepName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			console.log('target:' + target)
			if(target) {
				Game.creeps[creepName].moveTo(target.pos.x,target.pos.y)
			}
			
		}
		
		

		
	}
	
	
	
	
	
}


function SourceMine(){


	if(Game.creeps[creepName].store.getUsedCapacity() <= 10){
		Game.creeps[creepName].memory.fullSign = 0;//没有货物
		Game.creeps[creepName].memory.roadSign = 1
	}
	if(Game.creeps[creepName].store.getFreeCapacity() == 0){
		Game.creeps[creepName].memory.fullSign = 1;//没有空余空间
		if(Game.spawns['Spawn1'].memory.MinePoint1 == creepName){
			Game.spawns['Spawn1'].memory.MinePoint1 = 'none'
		}else if(Game.spawns['Spawn1'].memory.MinePoint2 == creepName){
			Game.spawns['Spawn1'].memory.MinePoint2 = 'none'
		}else if(Game.spawns['Spawn1'].memory.MinePoint3 == creepName){
			Game.spawns['Spawn1'].memory.MinePoint3 = 'none'
		}
		
		if(Game.creeps[creepName].memory.roadSign == 0){
			Game.creeps[creepName].memory.roadSign = 1
		}
	}
	
	
	const target = Game.creeps[creepName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
	Game.creeps[creepName].build(target)
	

	
	
	
	if(Game.creeps[creepName].memory.fullSign == 0){
		workMine(Game.creeps[creepName].room.find(FIND_SOURCES)[0], creepName)
	}
	else{
		
		if(Game.creeps[creepName].memory.roadSign == 1){
			Game.creeps[creepName].moveTo(35,19)
			const target = Game.creeps[creepName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			Game.creeps[creepName].build(target)
			if(Game.creeps[creepName].pos.x == 35 && Game.creeps[creepName].pos.y == 19){
				Game.creeps[creepName].memory.roadSign = 2
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 2){
			Game.creeps[creepName].moveTo(36,18)
			const target = Game.creeps[creepName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			Game.creeps[creepName].build(target)
			const Tower = Game.spawns['Spawn1'].room.find(FIND_STRUCTURES, {
			            /* 这是一个过滤器，过滤建筑，返回建筑类型是扩容器或者虫巢，条件是未满载的*/
			            filter: (structure) => {
			                return (structure.structureType == STRUCTURE_TOWER);
			            }
			        });
			Game.creeps[creepName].transfer(Tower[0],RESOURCE_ENERGY)
			Game.creeps[creepName].transfer(Game.spawns['Spawn1'],RESOURCE_ENERGY)
			
			if(Game.creeps[creepName].pos.x == 36 && Game.creeps[creepName].pos.y == 18){
				Game.creeps[creepName].memory.roadSign = 3
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 3){
			Game.creeps[creepName].moveTo(45,19)
			const target = Game.creeps[creepName].pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
			Game.creeps[creepName].build(target)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 45 && Game.creeps[creepName].pos.y == 19){
				Game.creeps[creepName].memory.roadSign = 4
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 4){
			Game.creeps[creepName].moveTo(46,16)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 46 && Game.creeps[creepName].pos.y == 16){
				Game.creeps[creepName].memory.roadSign = 5
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 5){
			Game.creeps[creepName].moveTo(45,15)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 45 && Game.creeps[creepName].pos.y == 15){
				Game.creeps[creepName].memory.roadSign = 6
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 5){
			Game.creeps[creepName].moveTo(45,13)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 45 && Game.creeps[creepName].pos.y == 13){
				Game.creeps[creepName].memory.roadSign = 6
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 6){
			Game.creeps[creepName].moveTo(47,13)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 47 && Game.creeps[creepName].pos.y == 13){
				Game.creeps[creepName].memory.roadSign = 7
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 7){
			Game.creeps[creepName].moveTo(47,15)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 47 && Game.creeps[creepName].pos.y == 15){
				Game.creeps[creepName].memory.roadSign = 8
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 8){
			Game.creeps[creepName].moveTo(47,22)
			Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
			if(Game.creeps[creepName].pos.x == 47 && Game.creeps[creepName].pos.y == 22){
				Game.creeps[creepName].memory.roadSign = 9
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 9){
			Game.creeps[creepName].moveTo(39,22)
			//把东西放罐子里
			//Game.creeps[creepName].withdraw 
			//if 没满
			//Game.creeps[creepName].transfer
			//Game.creeps['miner_000'].store.getUsedCapacity()
			if(Game.creeps[creepName].pos.x == 39 && Game.creeps[creepName].pos.y == 22){
				Game.creeps[creepName].memory.roadSign = 10
			}
		}
		else if(Game.creeps[creepName].memory.roadSign == 10){
			Game.creeps[creepName].moveTo(36,22)
			if(Game.creeps[creepName].pos.x == 36 && Game.creeps[creepName].pos.y == 22){
				Game.creeps[creepName].memory.roadSign = 1
			}
		}
		
		
	}
	
	
	
	
	
}

function getControllerPos(roomObj){
	const Controller = roomObj.find(FIND_STRUCTURES, {
		filter: (i) => i.structureType == STRUCTURE_CONTROLLER 
					  // i.store[RESOURCE_ENERGY] > 0
	});
	return Controller

}

function workUpgrade(creepName){
		console.log('hello'+creepName)
		Game.creeps[creepName].moveTo(getControllerPos(Game.spawns['Spawn1'].room)[0].pos)
		Game.creeps[creepName].upgradeController(getControllerPos(Game.spawns['Spawn1'].room)[0])
}

function workMine(sourceObj,creepName){
	console.log('hello2'+creepName)
	//mineWaitControl(sourceObj,creepName,mineX,mineY,waitX,waitY,longWaitX,longWaitY)
	
	// Game.spawns['Spawn1'].memory.MinePoint1 = 'none';
	// Game.spawns['Spawn1'].memory.WaitPoint1 = 'none';
	// Game.spawns['Spawn1'].memory.mineX1 = 31;
	// Game.spawns['Spawn1'].memory.mineY1 = 20;
	// Game.spawns['Spawn1'].memory.waitX1 = 32;
	// Game.spawns['Spawn1'].memory.waitY1 = 23;

	
	// Game.spawns['Spawn1'].memory.MinePoint2 = 'none';
	// Game.spawns['Spawn1'].memory.WaitPoint2 = 'none';
	// Game.spawns['Spawn1'].memory.mineX2 = 32;
	// Game.spawns['Spawn1'].memory.mineY2 = 20;
	// Game.spawns['Spawn1'].memory.waitX2 = 32;
	// Game.spawns['Spawn1'].memory.waitY2 = 24;
	
	// Game.spawns['Spawn1'].memory.MinePoint3 = 'none';
	// Game.spawns['Spawn1'].memory.WaitPoint3 = 'none';
	// Game.spawns['Spawn1'].memory.mineX3 = 32;
	// Game.spawns['Spawn1'].memory.mineY3 = 19;
	// Game.spawns['Spawn1'].memory.waitX3 = 32;
	// Game.spawns['Spawn1'].memory.waitY3 = 25;
	
	// Game.spawns['Spawn1'].memory.longWaitX = 27;
	// Game.spawns['Spawn1'].memory.longWaitY = 14;
	
	Miner1Existed = Object.keys(Game.creeps).indexOf(Game.spawns['Spawn1'].memory.MinePoint1);
	console.log('existed' + Miner1Existed)
	Miner2Existed = Object.keys(Game.creeps).indexOf(Game.spawns['Spawn1'].memory.MinePoint2);
	console.log('existed' + Miner2Existed)
	Miner3Existed = Object.keys(Game.creeps).indexOf(Game.spawns['Spawn1'].memory.MinePoint3);
	console.log('existed' + Miner3Existed)
	

	
	
	if(creepName.indexOf('builder') != -1){
		Game.creeps[creepName].moveTo(sourceObj)
		Game.creeps[creepName].harvest(sourceObj)
		return 
	}

	

	

			 
	if(Game.spawns['Spawn1'].memory.WaitPoint1 == 'none' && isLongWaitCreep(creepName)){
		Game.spawns['Spawn1'].memory.WaitPoint1 = creepName
	}else if(Game.spawns['Spawn1'].memory.WaitPoint2 == 'none' && isLongWaitCreep(creepName)){
		Game.spawns['Spawn1'].memory.WaitPoint2 = creepName
	}else if(Game.spawns['Spawn1'].memory.WaitPoint3 == 'none' && isLongWaitCreep(creepName)){
		Game.spawns['Spawn1'].memory.WaitPoint3 = creepName
	}
	
	// if(Game.spawns['Spawn1'].memory.MinePoint1 == creepName && (Game.spawns['Spawn1'].memory.mineX1 != Game.creeps[creepName].pos.x || Game.spawns['Spawn1'].memory.mineY1 != Game.creeps[creepName].pos.y)){
	// 	Game.spawns['Spawn1'].memory.WaitPoint1 = 'none'
	// }else if(Game.spawns['Spawn1'].memory.MinePoint2 == creepName && (Game.spawns['Spawn1'].memory.mineX2 != Game.creeps[creepName].pos.x || Game.spawns['Spawn1'].memory.mineY2 != Game.creeps[creepName].pos.y)){
	// 	Game.spawns['Spawn1'].memory.WaitPoint2 = 'none'
	// }else if(Game.spawns['Spawn1'].memory.MinePoint3 == creepName && (Game.spawns['Spawn1'].memory.mineX3 != Game.creeps[creepName].pos.x || Game.spawns['Spawn1'].memory.mineY3 != Game.creeps[creepName].pos.y)){
	// 	Game.spawns['Spawn1'].memory.WaitPoint3 = 'none'
	// }
	LongWaitCreep = 0
	
	
	
	

	
	
	if(Game.spawns['Spawn1'].memory.MinePoint1 == creepName && Game.spawns['Spawn1'].memory.WaitPoint2 != creepName && Game.spawns['Spawn1'].memory.WaitPoint3 != creepName){
		console.log('win ,'+creepName)
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.mineX1,Game.spawns['Spawn1'].memory.mineY1)
		Game.creeps[creepName].harvest(sourceObj)
	}else if(Game.spawns['Spawn1'].memory.MinePoint2 == creepName  && Game.spawns['Spawn1'].memory.WaitPoint1 != creepName && Game.spawns['Spawn1'].memory.WaitPoint3 != creepName){
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.mineX2,Game.spawns['Spawn1'].memory.mineY2)
		Game.creeps[creepName].harvest(sourceObj)
	}else if(Game.spawns['Spawn1'].memory.MinePoint3 == creepName  && Game.spawns['Spawn1'].memory.WaitPoint2 != creepName && Game.spawns['Spawn1'].memory.WaitPoint1 != creepName){
		console.log('yesyes')
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.mineX3,Game.spawns['Spawn1'].memory.mineY3)
		Game.creeps[creepName].harvest(sourceObj)
	}
	
	
	

	
	if(Game.spawns['Spawn1'].memory.WaitPoint1 == creepName){
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.waitX1,Game.spawns['Spawn1'].memory.waitY1)
		if(Game.spawns['Spawn1'].memory.MinePoint1 == 'none' || Miner1Existed == -1){
			Game.spawns['Spawn1'].memory.MinePoint1 = creepName
			Game.spawns['Spawn1'].memory.WaitPoint1 = 'none'
		}
	}else if(Game.spawns['Spawn1'].memory.WaitPoint2 == creepName){
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.waitX2,Game.spawns['Spawn1'].memory.waitY2)
		if(Game.spawns['Spawn1'].memory.MinePoint2 == 'none' || Miner2Existed == -1){
			Game.spawns['Spawn1'].memory.MinePoint2 = creepName
			Game.spawns['Spawn1'].memory.WaitPoint2 = 'none'
		}
	}else if(Game.spawns['Spawn1'].memory.WaitPoint3 == creepName){
		Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.waitX3,Game.spawns['Spawn1'].memory.waitY3)
		if(Game.spawns['Spawn1'].memory.MinePoint3 == 'none' || Miner3Existed == -1){
			Game.spawns['Spawn1'].memory.MinePoint3 = creepName
			Game.spawns['Spawn1'].memory.WaitPoint3 = 'none'
		}
	}
	
	
	
	
	if(isLongWaitCreep(creepName)){
		console.log('debug'+creepName +'isLongWaitCreep')
	 	Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.longWaitX,Game.spawns['Spawn1'].memory.longWaitY)
    }
	
	

	
	// if(Game.spawns['Spawn1'].memory.WaitPoint1 == 'none'){
	// 	Game.creeps[creepName].moveTo(Game.spawns['Spawn1'].memory.WaitX1,Game.spawns['Spawn1'].memory.WaitY1)
	// }

	
	

	
}


function isLongWaitCreep(creepName){
	if(Game.spawns['Spawn1'].memory.MinePoint1 != creepName &&
			 Game.spawns['Spawn1'].memory.WaitPoint1 != creepName &&
			 Game.spawns['Spawn1'].memory.MinePoint2 != creepName &&
			 Game.spawns['Spawn1'].memory.WaitPoint2 != creepName &&
			 Game.spawns['Spawn1'].memory.MinePoint3 != creepName &&
			 Game.spawns['Spawn1'].memory.WaitPoint3 != creepName){
				 return true
			 }
	else{
		return false
	}
}

function mineWaitControl(sourceObj,creepName,mineX,mineY,waitX,waitY,longWaitX,longWaitY){
	console.log('long wait'+creepName)
	//mineWaitControl(sourceObj,creepName,mineX,mineY,waitX,waitY,longWaitX,longWaitY)


	
}

// function findWay(){
//         console.log('here')
// 		//Game.creeps['miner_000'].move(Game.creeps['miner_000'].pos.getDirectionTo(ret.path[0]));
// 		console.log(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0].pos)
// 		Game.creeps['miner_000'].moveTo(Game.creeps['miner_000'].room.find(FIND_SOURCES)[0].pos)
// 		return 
//     }
	
// 	findWayBack : function(){
// 		ret = PathFinder.search(Game.creeps['miner_000'].pos, Game.creeps['miner_000'].room.find(FIND_SOURCES),    {
// 	  // We need to set the defaults costs higher so that we
// 	  // can set the road cost lower in `roomCallback`
// 	  plainCost: 2,
// 	  swampCost: 10,
	
// 	  roomCallback: function(roomName) {
	
// 	    let room = Game.rooms[roomName];
// 	    // In this example `room` will always exist, but since 
// 	    // PathFinder supports searches which span multiple rooms 
// 	    // you should be careful!
// 	    if (!room) return;
// 	    let costs = new PathFinder.CostMatrix;
	
// 	    room.find(FIND_STRUCTURES).forEach(function(struct) {
// 	      if (struct.structureType === STRUCTURE_ROAD) {
// 	        // Favor roads over plain tiles
// 	        costs.set(struct.pos.x, struct.pos.y, 1);
// 	      } else if (struct.structureType !== STRUCTURE_CONTAINER &&
// 	                 (struct.structureType !== STRUCTURE_RAMPART ||
// 	                  !struct.my)) {
// 	        // Can't walk through non-walkable buildings
// 	        costs.set(struct.pos.x, struct.pos.y, 0xff);
// 	      }
// 	    });
	
// 	    // Avoid creeps in the room
// 	    room.find(FIND_CREEPS).forEach(function(creep) {
// 	      costs.set(creep.pos.x, creep.pos.y, 0xff);
// 	    });
	
// 	    return costs;
// 	  },
// 	})
// 		console.log(ret.path[0])
// 		Game.creeps['miner_000'].memory.ContainerTarget = ret.path[0]
		
// 		return 
// 	}