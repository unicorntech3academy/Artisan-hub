from django.contrib import admin
from .models import Job, Bid

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'category', 'lga', 'budget', 'status', 'created_at')
    list_filter = ('status', 'category', 'lga')
    search_fields = ('title', 'description', 'owner__email', 'owner__username')

@admin.register(Bid)
class BidAdmin(admin.ModelAdmin):
    list_display = ('job', 'artisan', 'amount', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('job__title', 'artisan__email', 'artisan__username', 'proposal')
