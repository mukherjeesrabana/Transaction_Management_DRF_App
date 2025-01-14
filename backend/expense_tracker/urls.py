from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),

    path('subcategory-list/', views.subcategory_list, name='subcategory-list'),
    path('edit-subcategory/<int:id>/', views.edit_subcategory, name='edit-subcategory'),
    path('upload-subcats/', views.upload_subcats, name='upload-subcats'),

    path('category-list/', views.category_list, name='category-list'),
    path('transaction-list/', views.transaction_list, name='transaction-list'),
    path('upload-transactions/', views.upload_transactions, name='upload-transactions'),
    path('upload-categories/', views.upload_categories, name='upload-categories'),
    path('edit-transaction/<int:transaction_id>/', views.edit_transaction, name='edit-transaction'),
    path('delete-transaction/<int:transaction_id>/', views.delete_transaction, name='delete-transaction'),
    path('edit-category/<int:category_id>/', views.edit_category, name='edit-category'),
    path('delete-category/<int:category_id>/', views.delete_category, name='delete-category'),

    path('monthly-transactions/<int:year>/<int:month>/', views.monthly_transactions, name='monthly-transactions'),
    path('monthly-expenses-by-category/<int:year>/<int:month>/', views.monthly_expenses_by_category, name='monthly-expenses-by-category'),
    path('monthly-credits-by-category/<int:year>/<int:month>/', views.monthly_credits_by_category, name='monthly-credits-by-category'),
    path('monthly-overall-overview/<int:year>/<int:month>/', views.monthly_overall_overview, name='monthly-overall-overview'),
    path('monthly-categorywise-breakdown/<int:year>/<int:month>/', views.monthly_categorywise_breakdown, name='monthly-categorywise-breakdown'),
    
    path('user-list/', views.userlist, name='user-list'),
    path('upload-users/', views.upload_users, name='upload-users'),
    path('edit-user/<str:email>/', views.editUser, name='edit-user'),
    path('change-user-status/<str:email>/', views.changeUserStatus, name='change-user-status'),


    # other paths...
]