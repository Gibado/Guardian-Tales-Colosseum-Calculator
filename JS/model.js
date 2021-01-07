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

        var fWinSpeed = eTeam.toughness() / fTeam.dps();
        var eWinSpeed = fTeam.toughness() / eTeam.dps();

        return {
            name: fWinSpeed < eWinSpeed ? 'friendly team' : 'enemy team',
            speed: fWinSpeed < eWinSpeed ? fWinSpeed : eWinSpeed
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
        document.getElementById('banner').textContent = 'The winner is ' + results.name + ' in ' + results.speed + ' seconds!';
    }
};