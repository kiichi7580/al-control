# beer/views.py

from django.shortcuts import render
from django.http import JsonResponse
from .models import AlcoholAmount, Event
from datetime import datetime, timedelta
from datetime import datetime
import pytz

def ageconformation(request):
    return render(request, 'beer/ageconformation.html')

def home(request):
    today = datetime.today()
    tomorrow = today + timedelta(days=1)
    events_for_tomorrow = Event.objects.filter(start__date=tomorrow.date())
    get_alcohol = AlcoholAmount.objects.all()
    context = {
        'events_for_tomorrow': events_for_tomorrow,
        'get_alcohol': get_alcohol
    }
    return render(request, 'beer/home.html', context)

def get_alcohol(request):
    alcoholAmounts = AlcoholAmount.objects.all()
    out = []
    for alcoholAmount in alcoholAmounts:
        out.append({
            'amount': alcoholAmount.amount,
        })
    return JsonResponse(out, safe=False)

# def add_alcohol(request):
#     amount = request.GET.get("mount", None)
#     alcohol_amount = AlcoholAmount(amount=amount)
#     alcohol_amount.save()
#     return JsonResponse({'success': True})

def add_alcohol(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            amount = data.get('level', None)
            # setting_quantity = data.get('setting_quantity', None)

            # if amount is None or setting_quantity is None:
            if amount is None:
                return JsonResponse({'status': 'error', 'message': 'Invalid data'})

            # 新しい飲酒データを保存
            alcohol_amount = AlcoholAmount(amount=amount)
            alcohol_amount.save()

            return JsonResponse({'status': 'success', 'message': 'Data saved successfully!'})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)})

    return JsonResponse({'status': 'error', 'message': 'Invalid request method'})

def add_alcohol_page(request):
    return render(request, 'beer/add_alcohol.html')

def calendar(request):
    today = datetime.today()
    tomorrow = today + timedelta(days=1)
    events_for_tomorrow = Event.objects.filter(start__date=tomorrow.date())
    all_events = Event.objects.all()
    context = {
        "events": all_events,
        "events_for_tomorrow": events_for_tomorrow
    }
    return render(request, 'beer/calendar.html', context)

def all_events(request):
    all_events = Event.objects.all()
    out = []
    for event in all_events:
        # Tokyo タイムゾーンで表示
        out.append({
            'title': event.name,
            'id': event.id,
            'start': event.start.astimezone(pytz.timezone('Asia/Tokyo')).strftime("%Y-%m-%dT%H:%M:%S"),
            'end': event.end.astimezone(pytz.timezone('Asia/Tokyo')).strftime("%Y-%m-%dT%H:%M:%S"),
        })
    return JsonResponse(out, safe=False)

def add_event(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    
    # タイムゾーンを考慮してローカルタイムに変換
    tokyo_tz = pytz.timezone('Asia/Tokyo')
    start = datetime.strptime(start, "%Y-%m-%dT%H:%M").astimezone(tokyo_tz)
    end = datetime.strptime(end, "%Y-%m-%dT%H:%M").astimezone(tokyo_tz)
    
    event = Event(name=title, start=start, end=end)
    event.save()
    return JsonResponse({'success': True})

def update_event(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    id = request.GET.get("id", None)
    event = Event.objects.get(id=id)
    event.start = start
    event.end = end
    event.name = title
    event.save()
    return JsonResponse({'success': True})

def remove_event(request):
    id = request.GET.get("id", None)
    event = Event.objects.get(id=id)
    event.delete()
    return JsonResponse({'success': True})

def events_for_tomorrow(request):
    today = datetime.today()
    tomorrow = today + timedelta(days=1)
    events = Event.objects.filter(start__date=tomorrow.date())
    out = []
    for event in events:
        out.append({
            'title': event.name,
            'id': event.id,
            'start': event.start.astimezone(pytz.timezone('Asia/Tokyo')).strftime("%m月%d日 %H時%M分"),
            'end': event.end.astimezone(pytz.timezone('Asia/Tokyo')).strftime("%m月%d日 %H時%M分"),
        })
    return JsonResponse(out, safe=False)

