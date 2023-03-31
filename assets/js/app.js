$(document).ready(function () {
  $("select").niceSelect();
  $("#sex_option").next("div").find(".current").text("Seleccionar");
});

var sex_option = 0;
var age_option = 0;
var weight_option = 0;
var height_option = 0;
var activity_option = 1;
function calculateCalories(sex, age, weight, height, activityLevel) {
  // set constant values for calculations based on sex
  const bmrConstant = sex === 1 ? 88.362 : 447.593;
  const heightConstant = sex === 1 ? 4.799 : 3.098;
  const weightConstant = sex === 1 ? 13.397 : 9.247;
  const ageConstant = sex === 1 ? 5.677  : 4.330 
  // calculate basal metabolic rate (BMR)
  const bmr = bmrConstant + (weightConstant * weight) + (heightConstant * height) - (age * ageConstant);
  // assign activity level multiplier based on selection
  let activityMultiplier = 1.2;
  switch(activityLevel) {
    case "1":
      activ1ityMultiplier = 1.2;
      break;
    case "2":
      activityMultiplier = 1.375;
      break;
    case "3":
      activityMultiplier = 1.55;
      break;
    case "4":
      activityMultiplier = 1.725;
      break;
    case "5":
      activityMultiplier = 1.9;
      break;
    default:
      activityMultiplier = 1.2;
  }
  // calculate daily caloric needs by multiplying BMR by activity level multiplier
  return bmr * activityMultiplier;
}

$("#sex_option").change(function() {
  sex_option = $(this).val();
});

$("#age_option").change(function() {
  age_option = $(this).val();
});

$("#weight_option").change(function() {
  weight_option = $(this).val();
});

$("#height_option").change(function() {
  height_option = $(this).val();
});

$("#calculate").click(function() {
  if(sex_option != 0 && age_option != 0 && weight_option != 0 && height_option != 0) {
    $("#query").css("display","none");
    $("#answer").css("display","block");
    var activity_option = $("input[name='activity_option']:checked").val();
    const dailyCalories = calculateCalories(sex_option, age_option, weight_option, height_option, activity_option);
    $("#cal_value").text(dailyCalories.toFixed(2));
  }
});

$("#recalculate").click(function() {
  $("#sex_option").val(0);
  $("#age_option").val(0);
  $("#weight_option").val(0);
  $("#height_option").val(0);
  $("#check1").prop('checked',true);
  sex_option = 0;
  age_option = 0;
  weight_option = 0;
  height_option = 0;
  $("#query").css("display","block");
  $("#answer").css("display","none");
});

