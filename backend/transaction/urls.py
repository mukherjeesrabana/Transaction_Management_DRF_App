from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from . import views

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', views.index, name='index'),

    path('customer-transactions/', views.CustomerTransactionList.as_view(), name='customer-transaction-list'),
    path('customer-accounts/', views.CustomerAccountList.as_view(), name='customer-account-list'),
    path('accounts/<int:account_id>/transactions/', views.AccountTransactionList.as_view(), name='account-transaction-list'),
    path('customer-transactions/create/', views.CustomerTransactionCreateView.as_view(), name='customer-transaction-create'),
]