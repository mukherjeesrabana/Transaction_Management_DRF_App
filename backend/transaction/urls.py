from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.index, name='index'),

    

    path('customer-transactions/', views.customer_transaction_list, name='customer-transaction-list'),
    path('upload-transactions/', views.upload_transactions),
    path('transaction-summary/', views.transaction_summary),
    path('income-vs-expenses/', views.income_vs_expenses, name='income-vs-expenses'),
    path('description-wise-expense-breakdown/', views.description_wise_expense_breakdown, name='description-wise-expense-breakdown'),
    path('daily-expense-income-tracker/', views.daily_expense_income_tracker, name='daily-expense-income-tracker')
   
   
    # path('monthly-spending/', views.monthly_spending),
    # path('monthly-income/', views.monthly_income),
    # path('monthly-net/', views.monthly_net),
    

   
   
]