@component('mail::message')

    @subject('Aviso: Novo Contato Recebido')

    <p>Prezado SAC,</p>

    <p>Um novo contato foi recebido através do site Agilizando. Por favor, retorne o contato o mais breve possível.</p>

    <h2>Dados do Contato</h2>

    <table style="width: 100%; border-collapse: collapse;">
        <tr>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Nome</th>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Telefone</th>
            <th style="text-align: left; padding: 8px; border: 1px solid #ddd;">Email</th>
        </tr>
        <tr>
            <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">{{ $emailData['name'] }}</td>
            <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">{{ $emailData['phone'] }}</td>
            <td style="text-align: left; padding: 8px; border: 1px solid #ddd;">{{ $emailData['email'] }}</td>
        </tr>
    </table>

    <h2>Mensagem</h2>
    <p>{{ $emailData['formMessage'] }}</p>

    <p>Atenciosamente,</p>

    <p>Equipe Agilizando</p>

@endcomponent
