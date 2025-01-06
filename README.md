# telegram-transparency

In September 2024, Telegram [has changed its policy](https://www.bbc.com/news/articles/cvglp0xny3eo) to start accepting more requests from authorities. It turns out that Telegram has had a [@transparency](https://t.me/transparency) bot since [2018](https://meduza.io/en/news/2018/08/28/telegram-founder-assures-users-that-his-instant-messenger-s-new-privacy-policy-doesn-t-mean-he-s-getting-in-bed-with-the-fsb) but this bot only provides data for the country in which the Telegram account demanding data is registered. For instance in France:


![Screenshot for report on France as published on October 2024. Showing the following information:Transparency report for the period 01.01.24-30-09.24. Fullfiled requests from France for IP address and/or phone number: Q1 - 4 / Q2 - 6 / Q3 - 210 /. Total: 220; Affected users: Q1 - 17 /  Q2 -37 / Q3 - 632 / Total: 686 ; All requests are processed according to paragraph 8.3 of the Privacy Policy . The next transparency report will be published in January 2025.](img/fra_2024-10-10.jpg)

Considering the recent change in Telegram policy, it is a timely moment to start consolidating this data to have an overview of how many requests Telegram accept from authorities and where.

This [dataset](dataset.json) contains Telegram transparency data for 2024 on **74 countries** so far based on contribution from people all around the world (special thanks to the amazing Mastodon community!). Each entry is the [Alpha-3 country code](https://www.iban.com/country-codes) of a country and contains number of requests by the authorities and number of users affected for specific period of time (most of the time January 1st to September 30th 2024 for now).

See the data [here](https://te-k.github.io/telegram-transparency/).

## Acknowledements

* The awesome Mastodon community
* The [Meduza](https://meduza.io/) data [and community](https://x.com/zd_vladislav/status/1842181592778690728)
* The Telegram channel [All Transparency Reports](https://t.me/TransparencyReport2024)

## Articles on this topic

* Jan 2025: [Telegram Hands U.S. Authorities Data on Thousands of Users](https://www.404media.co/telegram-hands-u-s-authorities-data-on-thousands-of-users/)

## Please contribute!

You can contribute to this dataset by contacting the Telegram bot [@transparency](https://t.me/transparency) and sharing a screenshot of its answer. You can share this screenshot either by [opening an issue](https://github.com/Te-k/telegram-transparency/issues) or sending me an email at _tek AT randhome.io_.

## License

This data is provided under [CC-BY](https://creativecommons.org/licenses/by/4.0/deed.en) license.
