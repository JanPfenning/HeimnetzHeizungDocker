# HeimnetzHeizungDocker
Dieses Repository enthält den Code für eine kleine Automatisierung unseres Heimnetzes.
Mit der API unserer PV-Anlage kann gemessen werden, wie viel überproduktion herrscht.
Um die Energiekosten niedrig zu halten soll eine Elektroheizung so angeschaltet werden,
dass sie automatisch ausgeschaltet wird, sobald kein "kostenloser" Strom mehr vorhanden ist.

Technische Informationen sind in den Readmes in den Ordnern Webpage(Angular Website) und Wechselrichter(Nestjs API) zu finden.

Bitte beachte, dass die Dockerfiles explizit für die "arm" Plattform meines RasPis gebaut werden.
