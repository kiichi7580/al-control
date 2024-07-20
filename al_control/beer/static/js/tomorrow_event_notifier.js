$(document).ready(function () {
  $.ajax({
      url: '/events_for_tomorrow/',
      method: 'GET',
      success: function (data) {
          if (data.length > 0) {
              var message = "明日には " + data.length + " 件のイベントがあります:\n";
              data.forEach(function (event) {
                  message += event.title + " (" + event.start + ")\n";
              });
              $('#event-message').text(message);
              $('#event-notification').show();
          }
      },
      error: function () {
          console.log("次の日のイベントの取得に失敗しました");
      }
  });
});