<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    //
    public function list_res(Request $request){
        $id = $request->get('id');
        return \DB::select(\DB::raw("CALL list_res($id)"));
    }

    public function listfood()
    {
        $id = request('id');
        return \DB::select(\DB::raw("CALL list_food($id)"));
    }
    public function orders(Request $request){
        $userid = $request->header('id');
        $foodid = $request->get('food_id');
        $num = $request->get('num');
        $orderid = $request->get('order_id');
        \DB::table('don_hang')->insert(
            ['id_donhang'=> $orderid, 'id_khachhang'=>$userid, 'id_monan'=>$foodid, 'soluong'=>$num]
        );
        return response()->json(['mess'=>'success'], 200);
    }
    public function temp(){
        $value = 1;
        return json_decode($value, true);
    }
    public function getorderid(){
        $id_donhang = \DB::table('don_hang')->select('id_donhang')
            ->orderBy('id_donhang', 'desc')
            ->limit(1)->get('id_donhang');
        return $id_donhang;
    }

    public function getcategory(Request $request){
        $id = $request->get('id');
        return \DB::table('cuahang_loaidoan')
            ->join('loai_do_an', 'loai_do_an.id_loaidoan', '=', 'cuahang_loaidoan.id_loaidoan')
            ->select('loai_do_an.ten_loaidoan')
            ->where('cuahang_loaidoan.id_cuahang', $id)
            ->get();
    }
    public function findname(Request $request)
    {
        $name = $request->get('name');
        return \DB::select(\DB::raw("CALL list_res_by_name('$name')"));
    }
    public function list_order(Request $request){
        $id = $request->get('id');
        $detail = \DB::select(\DB::raw("CALL order_detail($id)"));
        return $detail;
    }

    public function getVoucher(){
        return \DB::select(\DB::raw("CALL list_voucher"));
    }
    public function getResByVoucher(Request $request){
        $id = $request->get('id');
        return \DB::select(\DB::raw("CALL Restaurant_by_voucher('$id')"));
    }
    public function getVoucherByRes(Request $request){
        $id = $request->get('id');
        return \DB::select(\DB::raw("CALL list_voucher_res('$id')"));
    }

    public function getResdetail(Request $request){
        $id = $request->get('id');
        return \DB::table('cua_hang')
        ->select('*')
        ->where('id_cuahang', $id)
        ->get();
    }

    public function test(Request $request){
        $userid = $request->header('id');
        $data = $request->getContent();
        $data = json_decode($data,true);
        $data = $data['cartItems'];
        $orderid = \DB::table('don_hang')
        ->select('id_donhang')
        ->orderBy('id_donhang', 'desc')
        ->limit(1)
        ->get();
        $k = json_decode($orderid, true);
        $k = $k[0]['id_donhang'] + 1;
        
        foreach($data as $value){
            \DB::table('don_hang')->insert(
                ['id_donhang'=> $k, 'id_khachhang'=>$userid, 'id_monan'=>$value['idFood'], 'soluong'=>$value['quantity']]
            );
        }
        return \DB::select(\DB::raw("SELECT MAX(id_donhang) AS MDH from don_hang"));
        //return response()->json(['message' => "successful"], 200);
        //return $data;
        
    }

    public function recommend(){
        return \DB::select(\DB::raw("CALL 3_best"));
    }

}
