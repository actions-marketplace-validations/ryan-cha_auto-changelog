# Auto Changelog

Automatic Changelog generator

## Inputs

### `token`

**Required** Github token.

### `exclude`

Exclude selected commit types (comma separated).

## Outputs

### `changelog`

The generated changelog.

## Example usage

```yaml
uses: ardalanamini/auto-changelog@v1.0.0
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  exclude: 'perf,other,breaking'
```
