# beer/views.py

from django.shortcuts import render
from django.http import JsonResponse
from .models import Event

def home(request):
    return render(request, 'beer/home.html')

def calendar(request):
    all_events = Event.objects.all()
    context = {
        "events": all_events,
    }
    return render(request, 'beer/calendar.html', context)

def all_events(request):
    all_events = Event.objects.all()
    out = []
    for event in all_events:
        out.append({
            'title': event.name,
            'id': event.id,
            'start': event.start.strftime("%Y-%m-%d %H:%M:%S"),
            'end': event.end.strftime("%Y-%m-%d %H:%M:%S"),
        })

    return JsonResponse(out, safe=False)

def add_event(request):
    start = request.GET.get("start", None)
    end = request.GET.get("end", None)
    title = request.GET.get("title", None)
    event = Event(name=title, start=start, end=end)
    event.save()
    return JsonResponse({'success': True})

def update(request):
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

def remove(request):
    id = request.GET.get("id", None)
    event = Event.objects.get(id=id)
    event.delete()
    return JsonResponse({'success': True})
