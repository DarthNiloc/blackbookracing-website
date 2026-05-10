---
title: "Reading the ledger: a worked example"
summary: "What every column on the public ledger actually means, walked through one real settled pick from our first month."
date: 2026-05-02
tier: open
readMinutes: 4
---

The ledger is the audit trail. Every column tells you something specific about a single settled pick. This is what each one means, walked through one real entry.

## The pick

Take the first row in our public ledger:

> 20 Apr · 14:30 · KELSO · HDL · Kilmore Rock · BSP 7.54 · WIN · +6.41

Six columns. Here's what each one is.

## Date

`20 Apr` — the calendar date the race was run, not the date we published the pick. Picks for tomorrow are published the night before; results land on the ledger the morning after the race once Betfair Starting Price reconciles.

If the date you see is yesterday or older, the pick is fully settled. We do not publish today's picks on the public ledger before the off — those go to Telegram subscribers. The ledger is the receipt.

## Off

`14:30` — the scheduled off time of the race. UK racing schedules drift slightly (a 14:30 race might go off at 14:31:42), but the off time is how we identify the race uniquely alongside the course.

## Course

`KELSO` — UK racing course. We post per-course performance separately on the ledger so you can see whether we have an edge at this venue or not. Kelso is a National Hunt track in the Scottish Borders.

## Race code

`HDL` — Hurdle. UK racing has five active codes on our ledger: FLT (Flat turf), AWF (All-weather flat), HDL (Hurdle), CHS (Chase), NHF (National Hunt Flat / bumper). Some of our streams have an edge in some codes and not others; the by-race-code panel breaks this out.

## Horse

`Kilmore Rock` — the horse we picked. Cloth number and saddle colour are not on the ledger because we identify horses by name; runner identity in UK racing is nearly always unambiguous from name + race + date.

## BSP

`7.54` — the Betfair Starting Price. The horse paid 7.54-to-1 on the exchange at the moment the race went off. A 1-point Back-SP bet would have returned 7.54 points gross if it won.

## Result

`WIN` — the horse finished first. Other possible values are LOSE (finished anywhere else) and VOID (the horse was withdrawn or the race didn't run; stakes returned). We don't break out place results because our streams bet to win, not to place.

## P&L

`+6.41` — net profit in points, after Betfair's 2% commission on the winning bet.

The math: stake 1.0pt at BSP 7.54 → returns 7.54pt gross on a win → minus 1.0pt stake = 6.54pt gross profit → minus 2% commission on the winnings = 6.41pt net.

For a losing bet, P&L is `-1.00` — the full stake. For a void, P&L is `0.00`.

## What you don't see

Some things are deliberately not on the ledger:

- **The reason we picked it.** That goes to subscribers in the daily slate. The ledger is for results, not narrative.
- **Live stake.** Public picks are 1pt unit. Real money stakes are computed as 1% of bankroll at placement time, scaled by tier and stream. The ledger normalises everything to points.
- **Today's picks.** Today's slate publishes via Telegram. The ledger only carries settled rows — never live ones.

What the ledger does show, every row, is a thing that already happened — at a price anyone could have got, with a result anyone can verify. That is the whole product.
