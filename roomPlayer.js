var mSpawn1;

module.exports = {
    getSpawn : function(){
		mSpawn1 = require("./spawn");
    },
	goToMine : function(){
		if(mSpawn1.spawnMiner()){
			console.log('True')
		}
		
	}
}




