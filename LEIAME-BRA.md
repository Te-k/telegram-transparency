# telegram-transparency (transparência do Telemgra)

Em setembro de 2024, o Telegram [mudou sua política](https://www.bbc.com/news/articles/cvglp0xny3eo) para começar a aceitar mais solicitações de autoridades. Acontece que o Telegram tem um bot [@transparency](https://t.me/transparency) desde [2018](https://meduza.io/en/news/2018/08/28/telegram-founder-assures-users-that-his-instant-messenger-s-new-privacy-policy-doesn-t-mean-he-s-getting-in-bed-with-the-fsb), mas esse bot só fornece dados para o país em que a conta do Telegram que está solicitando dados está registrada. Por exemplo, no Brasil:

![Imagem de tela para relatório sobre Brasil como publicado em 14 de outubro de 2024. Mostrando a seguind informação, traduzida do inglês: Relatório de transparência para o período de 01.01.24-30-09.24. Solicitações atendidas do Brasil para endereço IP e/ou número de telefone: T1 - 75 / T2 - 63 / T3 - 65; Usuários afetados: T1 - 133 / T2 -114 / T3 - 122; Todas as solicitações são processadas de acordo com o parágrafo 8.3 da Política de Privacidade. O próximo relatório de transparência será publicado em janeiro de 2025. Sendo T1 trimestre 1, T2 trimestre 2 e T3 trimestre 3](img/telegram-transparency-report-as-20241014.jpg)

Considerando a recente mudança na política do Telegram, é um momento oportuno para começar a consolidar esses dados para ter uma visão geral de quantas solicitações o Telegram aceita das autoridades e onde.

Este [conjunto de dados] (dataset.json) contém dados de transparência do Telegram para 2024 em **73 países** até o momento, com base na contribuição de pessoas de todo o mundo (agradecimentos especiais à incrível comunidade Mastodon!). Cada entrada é o [código de país Alfa-3] (https://www.iban.com/country-codes) de um país e contém o número de solicitações das autoridades e o número de usuários afetados por um período de tempo específico (na maioria das vezes, de 1º de janeiro a 30 de setembro de 2024, por enquanto).

## Reconhecimento

* A incrível comunidade no Mastodon
* Os dados e [e comunidade](https://x.com/zd_vladislav/status/1842181592778690728) [Meduza](https://meduza.io/)
* O canal [Todos os Relatórios de Transparência](https://t.me/TransparencyReport2024) no Telegram

## Por favor, contribua!

You can contribute to this dataset by contacting the Telegram bot [@transparency](https://t.me/transparency) and sharing a screenshot of its answer. You can share this screenshot either by [opening an issue](https://github.com/Te-k/telegram-transparency/issues) or sending me an email at _tek AT randhome.io_.

Você pode contribuir com esse conjunto de dados entrando em contato com o bot [@transparency] (https://t.me/transparency) do Telegram e compartilhando uma captura de tela da resposta. Você pode compartilhar essa captura de tela [abrindo uma ocorrência] (https://github.com/Te-k/telegram-transparency/issues) no Github ou enviando-me um e-mail para _tek AT randhome.io_.

## Licença

Esses dados são fornecidos sob licença [CC-BY]([https://creativecommons.org/licenses/by/4.0/deed.en](https://creativecommons.org/licenses/by/4.0/deed.pt-br)).

Transparency report for the period 01.01.24-30-09.24. Fullfiled requests from Brazil for IP address and/or phone number: Q1 - 75 / Q2 - 63 / Q3 - 65; Affected users: Q1 - 133 /  Q2 -114 / Q3 - 122 ; All requests are processed according to paragraph 8.3 of the Privacy Policy . The next transparency report will be published in January 2025.
