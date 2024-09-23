const FavComponents: React.FC<{ id: string }> = ({ id }) => {
  const handleFavorite = (id: string) => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };

  return (
    <button
      onClick={() => handleFavorite(id)}
      className="text-white px-2 py-1 rounded"
    >
      Add to Favorites
    </button>
  );
};
