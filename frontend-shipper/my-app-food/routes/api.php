<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('test', 'Api\RestaurantController@list_res');
Route::post('list_res', 'Api\RestaurantController@list_res');
Route::post('listfood', 'Api\RestaurantController@listfood');
Route::post('order', 'Api\RestaurantController@orders');
Route::post('findname','Api\RestaurantController@findname');
Route::post('list_order', 'Api\RestaurantController@list_order');
Route::post('xxx', 'Api\RestaurantController@test');
Route::get('recommend', 'Api\RestaurantController@recommend');

Route::get('list_res', 'Api\RestaurantController@list_res');
Route::get('listfood', 'Api\RestaurantController@listfood');
Route::get('getcategory', 'Api\RestaurantController@getcategory');
Route::get('orderid', 'Api\RestaurantController@getorderid');
Route::get('temp', 'Api\RestaurantController@temp');
Route::get('list_voucher', 'Api\RestaurantController@getVoucher');
Route::get('list_res_voucher', 'Api\RestaurantController@getResByVoucher');
Route::get('list_voucher_rest', 'Api\RestaurantController@getVoucherByRes');
Route::get('list_order', 'Api\RestaurantController@list_order');
Route::get('getResdetail', 'Api\RestaurantController@getResdetail');
