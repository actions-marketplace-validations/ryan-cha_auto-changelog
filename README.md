This is a forked version of [ardalanamin/auto-changelog](https://github.com/ardalanamini/auto-changelog).

# What's Different

- Generates change logs between the latest two **version tags**, regardless of the sha of the commit which triggers the action.

  - version tags: semver string starting with `v` (e.g. `v1.2.3`)

- Added a release timestamp (e.g. `2021-03-12 AM09:54:54` in KST)

- Added a link to diff between the latest two tags

- Added a little decoration
  - Added `change` type
  - Added some emoji

### Example Usage

```yaml
uses: ryan-cha/auto-changelog-between-tags@latest
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  exclude: "perf,other,breaking"
```

---

# + Original README.md

# Auto Changelog

Automatic Changelog generator

## Usage

To use this action, your commit messages have to follow the format below:

```git
type(category): description [flag]
```

The `type` must be one of the followings:

- `breaking` (Breaking Changes)
- `build` (Build System / Dependencies)
- `ci` (Continuous Integration)
- `chore` (Chores)
- `docs` (Documentation Changes)
- `feat` (New Features)
- `fix` (Bug Fixes)
- `other` (Other Changes)
- `perf` (Performance Improvements)
- `refactor` (Refactors)
- `revert` (Reverts)
- `style` (Code Style Changes)
- `test` (Tests)

> If the `type` is not found in the list, it'll be considered as `other`.

The `category` is optional and can be anything of your choice.

The `flag` is optional (if provided, it must be surrounded in square brackets) and can be one of the followings:

- `ignore` (Omits the commit from the changelog)

> If `flag` is not found in the list, it'll be ignored.

### Inputs

#### `token` **(Required)**

Github token.

#### `exclude` **(Optional)**

Exclude selected commit types (comma separated).

### Outputs

#### `changelog`

The generated changelog.

### Example usage

```yaml
uses: ardalanamini/auto-changelog@v1.1.0
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  exclude: "perf,other,breaking"
```
