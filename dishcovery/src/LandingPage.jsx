import React, { useMemo, useState } from "react";

/**
 * Single-file Dishcovery Landing Page
 * - CSS is embedded at the bottom inside <style>…</style>
 * - Searches Spoonacular by ingredients using complexSearch + includeIngredients
 * - In-page modal for recipe details (no redirect)
 */

const API_BASE = "https://api.spoonacular.com";

const MEAL_TYPES = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "dessert",
  "beverage",
];
const CUISINES = [
  "African","American","British","Cajun","Caribbean","Chinese","Eastern European","European",
  "French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
  "Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese",
];
const DIETS = [
  "gluten free","ketogenic","vegetarian","lacto-vegetarian","ovo-vegetarian",
  "vegan","pescetarian","paleo","primal","low FODMAP","whole30",
];

function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

function RecipeCard({ recipe, onOpen }) {
  const {
    title,
    image,
    readyInMinutes,
    servings,
    vegetarian,
    vegan,
    glutenFree,
  } = recipe;

  return (
    <div className="card">
      <div className="card-img-wrap">
        <img src={image} alt={title} loading="lazy" />
        <div className="img-overlay" />
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>{title}</h3>

        <div className="card-badges">
          {vegetarian && <Badge>Vegetarian</Badge>}
          {vegan && <Badge>Vegan</Badge>}
          {glutenFree && <Badge>Gluten-Free</Badge>}
          {readyInMinutes ? <Badge>{readyInMinutes} mins</Badge> : null}
          {servings ? <Badge>{servings} servings</Badge> : null}
        </div>

        <div className="card-actions">
          <button className="btn ghost" onClick={onOpen}>
            View Recipe
          </button>
          <button className="btn primary" onClick={onOpen}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function RecipeModal({ open, onClose, data }) {
  if (!open) return null;
  const { title, image, summary, readyInMinutes, servings, sourceUrl } = data || {};
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title || "Recipe"}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          {image ? <img className="modal-img" src={image} alt={title} /> : null}
          <div className="modal-meta">
            {readyInMinutes ? <Badge>{readyInMinutes} mins</Badge> : null}
            {servings ? <Badge>{servings} servings</Badge> : null}
          </div>
          <div
            className="modal-summary"
            dangerouslySetInnerHTML={{ __html: summary || "No summary." }}
          />
        </div>
        <div className="modal-footer">
          {sourceUrl ? (
            <a className="btn ghost" href={sourceUrl} target="_blank" rel="noreferrer">
              Original Source
            </a>
          ) : null}
          <button className="btn primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

function LabeledSelect({ label, value, onChange, placeholder, options }) {
  return (
    <label className="labeled-select">
      <span className="lbl">{label}</span>
      <div className="select-wrap">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={value ? "" : "placeholder"}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt[0].toUpperCase() + opt.slice(1)}
            </option>
          ))}
        </select>
        <span className="chev">▾</span>
      </div>
    </label>
  );
}

export default function LandingPage() {
  const apiKey = import.meta.env.VITE_SPOONACULAR_KEY;

  const [query, setQuery] = useState("");
  const [mealType, setMealType] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const cleanedIncludeIngredients = useMemo(
    () =>
      query
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .join(","),
    [query]
  );

  async function handleSearch(e) {
    e?.preventDefault?.();
    setError("");
    setLoading(true);
    setRecipes([]);

    try {
      if (!cleanedIncludeIngredients) {
        setLoading(false);
        setError("Please enter at least one ingredient (e.g., egg).");
        return;
      }

      const params = new URLSearchParams({
        apiKey,
        addRecipeInformation: "true",
        number: "24",
        instructionsRequired: "true",
        includeIngredients: cleanedIncludeIngredients,
      });
      if (mealType) params.set("type", mealType);
      if (cuisine) params.set("cuisine", cuisine);
      if (diet) params.set("diet", diet);

      const url = `${API_BASE}/recipes/complexSearch?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      const items = Array.isArray(data?.results) ? data.results : [];
      setRecipes(items);
      if (!items.length) setError("No recipes found. Try fewer filters.");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function openRecipe(id) {
    setOpen(true);
    setRecipeDetail(null);
    setDetailLoading(true);
    setError("");

    try {
      const url = `${API_BASE}/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Could not load recipe (${res.status})`);
      const data = await res.json();
      setRecipeDetail(data);
    } catch (err) {
      setError(err.message || "Failed to load recipe.");
    } finally {
      setDetailLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" />
            <span className="brand-name">Dishcovery</span>
          </div>
          <nav className="nav">
            <a>Breakfast</a>
            <a>Snacks</a>
            <a>Combos</a>
            <a>Meal</a>
            <a>Desserts</a>
          </nav>
          <div className="profile">Hello, Guest</div>
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <h1>Homemade Food Just a Click Away</h1>

          <form className="searchbar" onSubmit={handleSearch}>
            <div className="search-main">
              <span className="search-icon" aria-hidden>🔍</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter ingredients (e.g., egg, milk, sugar)"
                aria-label="Ingredients"
              />
            </div>

            <div className="filters">
              <LabeledSelect
                label="Meal Type"
                value={mealType}
                onChange={setMealType}
                placeholder="Any"
                options={MEAL_TYPES}
              />
              <LabeledSelect
                label="Select Dish/Cuisine"
                value={cuisine}
                onChange={setCuisine}
                placeholder="Any"
                options={CUISINES}
              />
              <LabeledSelect
                label="Food Type (Diet)"
                value={diet}
                onChange={setDiet}
                placeholder="Any"
                options={DIETS}
              />
            </div>

            <button type="submit" className="btn primary find-btn">
              Find Food
            </button>
          </form>
        </div>
      </section>

      <main className="content">
        <div className="section-header">
          <h2>All-Day Breakfast</h2>
          <button className="link">View All</button>
        </div>

        {loading ? (
          <div className="state">Searching recipes…</div>
        ) : error ? (
          <div className="state error">{error}</div>
        ) : recipes.length ? (
          <div className="grid">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} onOpen={() => openRecipe(r.id)} />
            ))}
          </div>
        ) : (
          <div className="placeholder">
            Try: <code>egg</code>, <code>chicken</code>, <code>tomato</code>
          </div>
        )}
      </main>

      <footer className="footer">
        <div>FREE FOOD DELIVERY</div>
        <div>COMPANY</div>
        <div>SUPPORT</div>
      </footer>

      <RecipeModal
        open={open}
        data={detailLoading ? { title: "Loading…" } : recipeDetail}
        onClose={() => setOpen(false)}
      />

      {/* ====== EMBEDDED CSS ====== */}
      <style>{`
* { box-sizing: border-box; }
html, body, #root { height: 100%; }
body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #222;
  background: #fafafa;
}
.topbar { background: #111; color: #fff; }
.topbar-inner { max-width: 1160px; margin: 0 auto; padding: 12px 16px; display: flex; align-items: center; gap: 16px; }
.brand { display: flex; align-items: center; gap: 10px; }
.brand-mark { width: 26px; height: 26px; background: #f0b400; border-radius: 6px; display: inline-block; }
.brand-name { font-weight: 700; letter-spacing: .2px; }
.nav { margin-left: 12px; display: flex; gap: 16px; font-size: 14px; opacity: .9; }
.nav a { color: #eee; text-decoration: none; cursor: pointer; }
.nav a:hover { color: #fff; }
.profile { margin-left: auto; font-size: 14px; opacity: .9; }

.hero {
  background-image: linear-gradient( to bottom, rgba(0,0,0,.55), rgba(0,0,0,.55) ),
    url("https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop");
  background-size: cover; background-position: center; color: #fff;
}
.hero-inner { max-width: 1160px; margin: 0 auto; padding: 46px 16px 36px; display: flex; flex-direction: column; align-items: center; }
.hero h1 { margin: 0 0 18px; font-size: 32px; text-align: center; }

.searchbar { width: 100%; max-width: 980px; background: #fff; color: #222; border-radius: 12px; padding: 10px; display: grid; gap: 10px; grid-template-columns: 1fr; }
@media (min-width: 900px) { .searchbar { grid-template-columns: 1.2fr 2fr auto; align-items: center; } }
.search-main { display: flex; align-items: center; gap: 8px; background: #f4f5f7; border-radius: 8px; padding: 10px 12px; border: 1px solid #e7e7e7; }
.search-main input { width: 100%; border: 0; outline: 0; background: transparent; font-size: 14px; }
.search-icon { opacity: .6; }

.filters { display: grid; gap: 8px; grid-template-columns: 1fr; }
@media (min-width: 640px) { .filters { grid-template-columns: 1fr 1fr 1fr; } }

.labeled-select .lbl { font-size: 12px; color: #555; display: block; margin: 2px 2px 6px; }
.select-wrap { position: relative; background: #f4f5f7; border: 1px solid #e7e7e7; border-radius: 8px; padding: 0 10px; }
.select-wrap select { appearance: none; -webkit-appearance: none; background: transparent; border: 0; outline: 0; padding: 10px 0; width: 100%; font-size: 14px; }
.select-wrap select.placeholder { color: #888; }
.select-wrap .chev { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #666; }
.find-btn { height: 42px; border-radius: 8px; }

.btn { border: 0; cursor: pointer; padding: 10px 14px; border-radius: 8px; font-weight: 600; font-size: 14px; }
.btn.primary { background: #f0b400; color: #222; }
.btn.primary:hover { filter: brightness(.96); }
.btn.ghost { background: #f4f4f4; }
.btn.ghost:hover { background: #eee; }
.link { background: transparent; border: 0; color: #f0b400; cursor: pointer; font-weight: 600; }

.badge { display: inline-block; font-size: 12px; padding: 4px 8px; margin-right: 6px; margin-bottom: 6px; border-radius: 999px; background: #f4f5f7; border: 1px solid #e7e7e7; }

.content { max-width: 1160px; margin: 26px auto 40px; padding: 0 16px; }
.section-header { display: flex; align-items: center; justify-content: space-between; margin: 6px 0 14px; }
.section-header h2 { margin: 0; font-size: 18px; }

.grid { display: grid; gap: 14px; grid-template-columns: repeat(1, minmax(0, 1fr)); }
@media (min-width: 620px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 900px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1160px) { .grid { grid-template-columns: repeat(4, 1fr); } }

.card { background: #fff; border: 1px solid #eee; border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
.card-img-wrap { position: relative; aspect-ratio: 16/10; overflow: hidden; }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
.img-overlay { position: absolute; inset: 0; box-shadow: inset 0 -60px 90px rgba(0,0,0,.15); pointer-events: none; }
.card-body { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.card-title { margin: 0; font-size: 15px; line-height: 1.35; max-height: 3.7em; overflow: hidden; }
.card-badges { min-height: 26px; }
.card-actions { display: flex; gap: 8px; justify-content: space-between; }

.state { padding: 18px; color: #555; }
.state.error { color: #b00020; }
.placeholder { padding: 10px 0 18px; color: #666; }
.placeholder code { background: #eee; padding: 2px 6px; border-radius: 6px; }

.footer { border-top: 1px solid #eee; padding: 20px 16px; color: #666; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center; }

.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.45); display: grid; place-items: center; z-index: 50; }
.modal { width: min(840px, 92vw); background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,.25); display: flex; flex-direction: column; max-height: 86vh; }
.modal-header { padding: 12px 16px; border-bottom: 1px solid #eee; display: flex; align-items: center; justify-content: space-between; }
.modal-body { padding: 14px 16px; overflow: auto; }
.modal-img { width: 100%; border-radius: 8px; margin-bottom: 10px; }
.modal-meta { margin: 6px 0 10px; }
.modal-summary p { margin: 10px 0; }
.modal-footer { padding: 12px 16px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 8px; }
.icon-btn { border: 0; background: transparent; font-size: 18px; cursor: pointer; }
      `}</style>
    </div>
  );
}
