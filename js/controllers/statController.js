(function () {
	"use strict";


	angular.module("football")
		.controller("StatController", StatController);


		StatController.$inject = ["PlayerService"];

		function StatController(PlayerService) {
			this.player = PlayerService.allPlayers;

			this.addPoints = function addPoints(player){
				var rec = player.rec;
				var rtd = player.rtd;
				var tackles = player.tackles;
				var dint = player.dint;
				var dtd = player.dtd;
				var comp = player.comp;
				var ptd = player.ptd;
				var pint = player.pint;

				if (player.gender === "female") {
					return rec + (rtd * 7) + tackles + (dint * 10) + (dtd * 10) + comp + (ptd * 5) - (pint * 3);
				} else {
					return rec + (rtd * 5) + tackles + (dint * 5) + (dtd * 7) + comp + (ptd * 3) - (pint * 3);
				}
			};

			this.sortType = this.addPoints;
			this.sortReverse = true;
			this.searchPlayer = "";
			this.playerName = "";
			
			this.recPoints = function recPoints(player) {

				if (player.gender === "female") {
					return player.rec + (player.rtd * 7);
				} else {
					return player.rec + (player.rtd * 5);
				}
			};

			this.defPoints = function defPoints(player) {

				if (player.gender === "female") {
					return player.tackles + (player.dint * 7) + (player.dtd * 10);
				} else {
					return player.tackles + (player.dint * 5) + (player.dtd * 7);
				}
			};

			this.pasPoints = function pasPoints(player) {
				if (player.gender === "female") {
					return player.comp + (player.ptd * 5) - (player.pint * 3);
				} else {
					return player.comp + (player.ptd * 3) - (player.pint * 3);
				}
			};

			this.newPlayer = function newPlayer (playerForm) {
				console.log(playerForm);
				PlayerService.createPlayer(this.playerName, this.gender)
					.then(function(){
						alert("new player added");
					})
					.catch(function(){
						alert("something went wrong");
					});
				this.playerName="";
				this.gender="";
			};

			this.editPlayer = function editPlayer(playerStats) {
				console.log("saving player info", playerStats);
				PlayerService.savePlayer(playerStats)
					.then(function(){
						alert("saving player info");
					}) 
					.catch(function(){
						alert("did not save");
					});
			};

			this.removePlayer = function removePlayer(playerStats){
				console.log("hello");
				PlayerService.deletePlayer(playerStats)
					.then(function(){
						alert("player deleted");
					})
					.catch(function(){
						alert("could not delete player");
					});
			};


		}

})();