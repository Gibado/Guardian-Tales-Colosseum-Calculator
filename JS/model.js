var model = {
    friendlyTeam: null,
    enemyTeam: null,

    // Pulls team details from the page
    getTeam: function(div) {
        var numbers = div.getElementsByTagName('input');
        return Team.createTeam(parseFloat(numbers[0].value), parseFloat(numbers[1].value), parseFloat(numbers[2].value));
    },

    // Calculates how quickly all characters will die
    battle: function() {
        var fTeam = this.friendlyTeam.clone();
        var eTeam = this.enemyTeam.clone();

        var deadList = [];
        while (fTeam.size() != 0 && eTeam.size() != 0) {
            deadList.push(this.deathBattle(fTeam, eTeam));
        }

        var totalTime = 0;
        for (var i = 0; i < deadList.length; i++) {
            totalTime += deadList[i].timeSpent;
        }

        return {
            name: fTeam.size() > 0 ? 'friendly team' : 'enemy team',
            speed: totalTime,
            deadList: deadList
        };
    },

    // Updates 2 teams with damage until 1 unit dies on either team
    // Returns the name of the team with a loss and how much time passed
    deathBattle: function(teamA, teamB) {
        // Find how fast the 1st unit on each team will die
        var aDeathSpeed = teamA.units[0].toughness / teamB.dps();
        var bDeathSpeed = teamB.units[0].toughness / teamA.dps();

        var teamWithLoss, otherTeam, timeSpent, teamAlost;
        if (aDeathSpeed < bDeathSpeed) {
            // Unit on teamA dies 1st
            teamWithLoss = teamA;
            teamAlost = true;
            otherTeam = teamB;
            timeSpent = aDeathSpeed;
        } else {
            // Unit on teamB dies 1st
            teamWithLoss = teamB;
            teamAlost = false;
            otherTeam = teamA;
            timeSpent = bDeathSpeed;
        }

        // Assign damage to other team 1st
        var damagedUnit = otherTeam.units[0];
        damagedUnit.toughness -= teamWithLoss.dps() * timeSpent;
        // Remove dead unit from team with loss
        teamWithLoss.units.shift();

        return {
            teamAlost: teamAlost,
            timeSpent: timeSpent
        };
    },

    // Updates the model teams and battle results
    update: function() {
        this.friendlyTeam = this.getTeam(document.getElementById('myTeam'));
        this.enemyTeam = this.getTeam(document.getElementById('enemyTeam'));

        this.updateResults(this.battle());
    },

    // Updates the page with battle results
    updateResults: function(results) {
        // Update result banner
        document.getElementById('banner').textContent = 'The winner is ' + results.name + ' in ' + results.speed.toFixed(2) + ' seconds!';

        // Update death table

        // Create new table data
        var newTbody = document.createElement('tbody');
        var deathlist = results.deadList;
        var friendlyDeathCount = 0;
        var enemyDeathCount = 0;
        var currentTime = 0;
        for (var i = 0; i < deathlist.length; i++) {
            var row = newTbody.insertRow();
            var cell = row.insertCell();
            if (deathlist[i].teamAlost) {
                // friendly team died
                cell.innerHTML = "<b>Friendly " + ++friendlyDeathCount + "</b>";
            } else {
                // enemy team died
                cell.innerText = "Enemy " + ++enemyDeathCount;
            }

            cell = row.insertCell();
            currentTime += deathlist[i].timeSpent
            cell.innerText = currentTime.toFixed(2);
        }

        // Swap in new table data
        var oldTableData = document.getElementsByTagName('tbody')[0];
        oldTableData.parentNode.replaceChild(newTbody, oldTableData);
    }
};