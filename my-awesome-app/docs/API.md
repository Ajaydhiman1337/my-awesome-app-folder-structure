# API Reference

## Checkout session

### GET /checkout/session

Returns the current checkout session summary.

### POST /checkout/session

Creates a checkout session for the provided payload.

Example payload:

```json
{
  "total": 42.5,
  "currency": "USD"
}
```
