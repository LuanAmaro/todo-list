<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Requests\LoginRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class AuthenticateController extends Controller
{
    public function login()
    {
        if (Auth::check()) {
            return redirect()->to('/');
        }

        return Inertia::render('auth/login');
    }

    public function authenticate(LoginRequest $request)
    {
        try {
            $credentials = $request->only("email", "password");

            if (!Auth::attempt($credentials)) {
                return redirect()->back()->with('message', 'E-mail e Senha incorreto!');
            }

            return redirect()->intended('/');
        } catch (Exception $e) {
            return redirect()->back()->with('message', 'E-mail e Senha incorreto!');
        }
    }

    public function store(Request $request)
    {
        try {
            $inputs  = $request->only("name", "email", "password");
            $created = User::create($inputs);

            $credentials = [
                "email" => $created->email,
                "password" => $request->password
            ];

            Auth::attempt($credentials);

            return redirect()->intended('/');
        } catch (Exception $e) {
            return redirect()->back()->with('message', 'E-mail e Senha incorreto!');
        }
    }

    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/login');
    }
}
