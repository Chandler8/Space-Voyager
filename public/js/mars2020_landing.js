
  $(document).ready(function(){
    window["countdown_interval_mars2020_landing"] = setInterval(function() {
      if($("#countdown_time_mars2020_landing").length == 0) {
        clearInterval(window["countdown_interval_mars2020_landing"])
      }
      //dont run if already set to completed
      if ($("#countdown_time_mars2020_landing .completed").length == 0){
        var landing = new Date('Thu, 18 February 2021 20:43:37 -0000');
        var count_up = false
        var in_sols = false 
        var now = new Date();
        if(in_sols) {
          var sol_0 = '0'
          var deg_east = '0'
          var now_msd = utcToMsd(now).toFixed(5)
          var now_j2000 = daysSinceJ200Epoch(now).toFixed(5)
          var sol = Math.floor(now_msd - ((360 - deg_east) / 360) - parseInt(sol_0));
          var mars_date_params = getMarsParamsOfDate(now_j2000)
          var lmst = getMissionTime(mars_date_params[4], now_j2000, parseFloat(deg_east))
          var hms = hToHMS(lmst)
          year_day = "<div class='time_years unit'>" + sol + "<span class='time_label'>sol</span></div>"
          $("#countdown_time_mars2020_landing").html(year_day + "<div class='time_hours unit'>" + hms[0] + "<span class='time_label'>hrs</span></div><div class='time_minutes unit'>" + hms[1] + "<span class='time_label'>mins</span></div><div class='time_seconds unit'>" + hms[2] + "<span class='time_label'>secs</span></div></div>");
        } else if(now < landing || count_up){
          var diff;
          if(count_up){
            diff = moment.preciseDiff(now, landing, true)
          } else {
            diff = moment.preciseDiff(landing, now, true)
          }
          var year_day = "";
          if(diff.years != 0){
            year_day = "<div class='time_years unit'>" + diff.years + "<span class='time_label'>yrs</span></div>"
          }
          if (diff.months != 0){
            //year_day += "<div class='time_months unit'>" + diff.months + "<span class='time_label'>mos</span></div>"
          }
          if (diff.hours != 0){
            numOfDays = moment().diff(landing,'days')*-1;
		  } else {
            numOfDays = (moment().diff(landing,'days')-1) *-1;
          }
          year_day += "<div class='time_days unit'>" + moment().diff(landing,'days')*-1 + "<span class='time_label'>days</span></div>"
  
          $("#countdown_time_mars2020_landing").html(year_day + "<div class='time_hours unit'>" + (diff.hours) + "<span class='time_label'>hrs</span></div><div class='time_minutes unit'>" + (diff.minutes) + "<span class='time_label'>mins</span></div><div class='time_seconds unit'>" + (diff.seconds) + "<span class='time_label'>secs</span></div></div>");
  
        } else {
          $(".countdown_clock .date").hide();
          $("#countdown_time_mars2020_landing").html("<div class='completed'>STAY TUNED <br>ON <b><a href='/mars2020/timeline/landing/watch-online/' class='textGold'>NASA TV</a></b></div>")
        }
      }
     },1000); //if in sols update every mars second
    });
