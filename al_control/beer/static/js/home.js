var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    aniId;

var w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight,
    particles = [],
    bubbles = [],
    level = 0,
    setting_quantity = 0,
    fill = false,
    color = "#d4af37",
    c;

function particle(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.respawn = function () {
    this.x = Math.random() * (w * 0.8) + (0.1 * w);
    this.y = Math.random() * 30 + h - (h - 100) * level / 100 - 50 + 50;
    this.d = Math.random() * 5 + 5;
  };
}

function bubble(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
  this.respawn = function () {
    this.x = Math.random() * w;
    this.y = h - (h - 100) * level / 100 - 50 + Math.random() * 20 - 10; // 泡が液面に沿うように配置
    this.d = Math.random() * 3 + 2; // 泡の大きさ
  };
}

function init() {
  c = 0;
  particles = [];
  bubbles = [];
  for (var i = 0; i < 40; i++) {
    var obj = new particle(0, 0, 0);
    obj.respawn();
    particles.push(obj);
  }
  for (var i = 0; i < 100; i++) { // 泡の数を増やす
    var obj = new bubble(0, 0, 0);
    obj.respawn();
    bubbles.push(obj);
  }
  aniId = window.requestAnimationFrame(draw);
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  // ビールの液体部分の描画
  ctx.beginPath();
  ctx.moveTo(w, h - (h - 100) * level / 100 - 50);
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.lineTo(0, h - (h - 100) * level / 100 - 50);
  var temp = (50 * Math.sin(c * 1 / 50));
  ctx.bezierCurveTo((w / 3), h - (h - 100) * level / 100 - 50 - temp,
    (2 * w / 3), h - (h - 100) * level / 100 - 50 + temp,
    w, h - (h - 100) * level / 100 - 50);
  ctx.fill();

  // 泡の描画
  ctx.fillStyle = "#FFFFFF";
  for (var i = 0; i < bubbles.length; i++) {
    ctx.beginPath();
    ctx.arc(bubbles[i].x, bubbles[i].y, bubbles[i].d, 0, 2 * Math.PI);
    ctx.fill();
  }

  // パーティクルの描画
  ctx.fillStyle = fill ? color : "#FFFFFF";
  for (var i = 0; i < particles.length; i++) {
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].d, 0, 2 * Math.PI);
    if (fill) {
      ctx.fill();
    } else {
      ctx.stroke();
    }
  }

  ctx.fillText("c:" + c + " lv:" + level, 10, 10);

  update();
  aniId = window.requestAnimationFrame(draw);
}

function update() {
  c++;
  if (100 * Math.PI <= c)
    c = 0;
  for (var i = 0; i < particles.length; i++) {
    particles[i].x = particles[i].x + Math.random() * 2 - 1;
    particles[i].y = particles[i].y - 1;
    particles[i].d = particles[i].d - 0.04;
    if (particles[i].d <= 0)
      particles[i].respawn();
  }
  for (var i = 0; i < bubbles.length; i++) {
    bubbles[i].x = bubbles[i].x + Math.random() * 2 - 1;
    bubbles[i].d = bubbles[i].d - 0.01;
    if (bubbles[i].d <= 0 || bubbles[i].y < h - (h - 100) * level / 100 - 60 || bubbles[i].y > h - (h - 100) * level / 100 - 40) {
      bubbles[i].respawn();
    }
  }
}

document.getElementById("level").oninput = function () {
  level = document.getElementById("level").value;
}

document.getElementById("Filled_Hollow").onchange = function () {
  fill = document.getElementById("Filled_Hollow").checked;
}

document.getElementById("right_blue_beer").onchange = function () {
  if (document.getElementById("right_blue_beer").checked)
    color = "#add8e6";
  else
    color = "#d4af37";
}

document.getElementById("setting_quantity").oninput = function () {
  setting_quantity = document.getElementById("setting_quantity").value;
}

window.addEventListener('resize', function () {
  w = canvas.width = window.innerWidth / 2;
  h = canvas.height = window.innerHeight / 2;
  window.cancelAnimationFrame(aniId);
  init();
});

init();


// お酒の本数
$(document).ready(function() {
  $('.up').click(function() {
    var countInput = $(this).siblings('.count');
    var currentCount = parseInt(countInput.val());
    countInput.val(currentCount + 1);
  });

  $('.down').click(function() {
    var countInput = $(this).siblings('.count');
    var currentCount = parseInt(countInput.val());
    if (currentCount > 0) {
      countInput.val(currentCount - 1);
    }
  });

  $('.resetbtn').click(function() {
    var countInput = $(this).siblings('.count');
    countInput.val(0);
  });

  $('.increase_button').click(function() {
    var total = 0;
    $('.select_item').each(function() {
      var quantity = parseInt($(this).data('quantity'));
      var count = parseInt($(this).siblings('.incre_decre_btn_container').find('.count').val());
      if (!isNaN(quantity) && !isNaN(count)) {
        total += quantity * count;
      }
    });
    $('#level').val(total);
    level = (total / setting_quantity) * 100;
  });

  $('.decrease_button').click(function() {
    $('#level').val(0);
    $('.count').val(0);
    level = 0;
  });
});