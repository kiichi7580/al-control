$(document).ready(function () {
    var calendar = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: '/all_events',
        selectable: true,
        selectHelper: true,
        editable: true,
        eventLimit: true,
        timeZone: 'local', // ローカルタイムゾーンを指定
        select: function (start, end, allDay) {
            var startTime = moment(start).format("YYYY-MM-DDTHH:mm");
            var endTime = moment(end).format("YYYY-MM-DDTHH:mm");
            $('#eventStartTime').val(startTime);
            $('#eventEndTime').val(endTime);
            $('#eventModal').modal('show');
            $('#saveEvent').off('click').on('click', function () {
                var title = $('#eventTitle').val();
                var start = $('#eventStartTime').val();
                var end = $('#eventEndTime').val();
                
                $.ajax({
                    type: "GET",
                    url: '/add_event',
                    data: {'title': title, 'start': start, 'end': end},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        $('#eventModal').modal('hide');
                        alert("イベントが追加されました！");
                    },
                    error: function (data) {
                        alert('イベントを追加できませんでした...');
                    }
                });
            });
            calendar.fullCalendar('unselect'); // 選択範囲の解除
        },
        eventResize: function (event) {
            var start = moment(event.start).format("YYYY-MM-DDTHH:mm:ss");
            var end = moment(event.end).format("YYYY-MM-DDTHH:mm:ss");
            var title = event.title;
            var id = event.id;
            $.ajax({
                type: "GET",
                url: '/update',
                data: {'title': title, 'start': start, 'end': end, 'id': id},
                dataType: "json",
                success: function (data) {
                    calendar.fullCalendar('refetchEvents');
                    alert('イベントが更新されました！');
                },
                error: function (data) {
                    alert('イベントの更新に問題が発生しました...');
                }
            });
        },
        eventDrop: function (event) {
            var start = moment(event.start).format("YYYY-MM-DDTHH:mm:ss");
            var end = moment(event.end).format("YYYY-MM-DDTHH:mm:ss");
            var title = event.title;
            var id = event.id;
            $.ajax({
                type: "GET",
                url: '/update',
                data: {'title': title, 'start': start, 'end': end, 'id': id},
                dataType: "json",
                success: function (data) {
                    calendar.fullCalendar('refetchEvents');
                    alert('イベントの日程が変更されました！');
                },
                error: function (data) {
                    alert('イベントの日程が変更できませんでした...');
                }
            });
        },
        eventClick: function (event) {
            if (confirm("このイベントを削除してもよろしいですか？")) {
                var id = event.id;
                $.ajax({
                    type: "GET",
                    url: '/remove',
                    data: {'id': id},
                    dataType: "json",
                    success: function (data) {
                        calendar.fullCalendar('refetchEvents');
                        alert('イベントが削除されました！');
                    },
                    error: function (data) {
                        alert('イベントが削除できませんでした...');
                    }
                });
            }
        },
        eventRender: function (event, element) {
            // 月表示や他のビューで時間表示を削除
            element.find('.fc-title').text(event.title); // イベントのタイトルのみ表示
        }
    });

    // 明日のイベントをチェックして通知
    $.ajax({
        type: "GET",
        url: '/events_for_tomorrow',
        dataType: "json",
        success: function (events) {
            if (events.length > 0) {
                var message = "明日には " + events.length + " 件のイベントがあります:\n";
                events.forEach(function (event) {
                    var start = moment(event.start).format('YYYY-MM-DD HH:mm');
                    var end = moment(event.end).format('YYYY-MM-DD HH:mm');
                    message += event.title + " (" + start + " - " + end + ")\n";
                });
                alert(message);
            }
        },
        error: function (data) {
            alert('明日のイベントの取得に失敗しました...');
        }
    });
});
