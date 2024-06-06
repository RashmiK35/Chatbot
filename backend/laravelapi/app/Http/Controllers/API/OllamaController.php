<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class OllamaController extends Controller
{
    public function runOllamaModel(Request $request)
    {

        /*
        $ollamaApiUrl = 'http://localhost:11434/api/run';

        echo $ollamaApiUrl;
        exit;
        
        $model = $request->input('model');
        $prompt = $request->input('prompt');

        $apiToken = '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';
        $ollamaApiUrl = 'http://localhost:11434/api/run'; 

        // Make the API request to Ollama
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . $apiToken,
        ])->post($ollamaApiUrl, [
            'model' => $model,
            'prompt' => $prompt,
        ]);

        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://localhost:11434',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        echo $response;

        exit();


        // Check if the request was successful
        if ($response->successful()) {
            return response()->json($response->json(), $response->status());
        } else {
            return response()->json(['error' => 'Error fetching response from Ollama API'], $response->status());
        }

        */




        
    
        $model = $request->input('model');
        $prompt = $request->input('prompt');
        
        $curl = curl_init();

        curl_setopt_array($curl, array(
        CURLOPT_URL => '',
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_SSL_VERIFYHOST => FALSE,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        // CURLOPT_POSTFIELDS =>$jsonData,
        CURLOPT_POSTFIELDS =>'{
        "model": "llama3",
        "prompt": "'.htmlspecialchars($prompt, ENT_QUOTES, 'UTF-8').'",
        "stream": false,
        "response" : "" 
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: application/json'
        ),
        ));

        $response = curl_exec($curl);
        
        // curl_close($curl);

        if (curl_errno($curl)) {
                $error_message = curl_error($curl);
                print_r($error_message);
                curl_close($curl);

                // return response()->json(['error' => $error_message], 500);
            } 
        
            $decoded_resp = json_decode($response,true);


        // print_r($decoded_resp);

        // $decoded_resp = array_column($response, 'response');

        return response()->json([
            'status' => true,
            'message' => 'Successfully',
            'errors' => [],
            'data' => $decoded_resp['response'],
            // 'prompt' => $prompt,
            // 'jsondata' => $response,
        ], 200);
    }
}
