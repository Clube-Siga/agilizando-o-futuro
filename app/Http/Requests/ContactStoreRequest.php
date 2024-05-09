<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class ContactStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(Request $request): bool
    {
        $riskScore = $request->get('g-recaptcha-response');
        $response = $this->recaptcha->verify($riskScore, $request->ip());
        if ($riskScore > 0.5) {
            $response->isSucess();
            return false;
        }

        // Validação adicional do formulário
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone' => 'required|string|regex:/^\(\d{2}\) \d{5}-\d{4}$/',
            'email' => 'required|string|email|max:255',
            'subject' => 'required|string',
            'formMessage' => 'required|string|max:500',
        ];
    }

    /**
 * Get the validation messages that apply to the request.
 *
 * @return array<string, string>
 */
    public function messages(): array
    {
        return [
            'name.required' => 'O campo Nome é obrigatório.',
            'name.string' => 'O campo Nome deve ser um texto.',
            'name.max' => 'O campo Nome deve conter no máximo 255 caracteres.',
            'phone.required' => 'O campo Telefone é obrigatório.',
            'phone.string' => 'O campo Telefone deve ser um texto.',
            'phone.regex' => 'O formato do Telefone é inválido. Exemplo: (99) 99999-9999',
            'email.required' => 'O campo E-mail é obrigatório.',
            'email.string' => 'O campo E-mail deve ser um texto.',
            'email.email' => 'O E-mail informado é inválido.',
            'email.max' => 'O campo E-mail deve conter no máximo 255 caracteres.',
            'subject.required' => 'O campo Assunto é obrigatório.',
            'subject.string' => 'O campo Assunto deve ser um texto.',
            'formMessage.required' => 'O campo Mensagem é obrigatório.',
            'formMessage.string' => 'O campo Mensagem deve ser um texto.',
            'formMessage.max' => 'O campo Mensagem deve conter no máximo 500 caracteres.',
        ];
    }

}
