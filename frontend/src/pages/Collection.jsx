import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  // Two arrow fnx to put the data in the two states
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
      // e.target.value is the value of the checkbox that was clicked (e.g. "Men"). This line checks: "Is 'Men' already inside my category array?" — i.e., is this checkbox already checked/selected?

      // If yes (it's already in there), this means the user just unchecked it — so we need to remove it. prev is the current category array before this update. .filter() builds a new array keeping only items that are not equal to the clicked value — effectively removing it.
    } else {
      // category not avaible so insert that
      setCategory((prev) => [...prev, e.target.value]);
      // If the value is not already in category, it means the user just checked it — so we add it. [...p
      // rev, e.target.value] means: take everything that was already in the array (...prev spreads it out), and add the new value at the end.
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
      // same logic
    } else {
      // category not avaible so insert that
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  // Apply filter
  const applyFilter = () => {
    let productsCopy = products.slice(); // Makes a copy of the full products

    // logic for search for collection and add it in useEffect so that it can execute the applyfilter fnx and search the products
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => category.includes(item.category),
        // If the user has selected at least one category (e.g. ["Men"]), filter productsCopy down to only products whose item.category is inside the selected category array. If no category is selected, skip this — show all.
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(
        (item) => subCategory.includes(item.subCategory),
        // same logic here
      );
    }

    setFilterProducts(productsCopy);
    // Finally, save this filtered result into filterProducts state — which is what actually gets displayed on screen (see the .map() in the JSX at the bottom).
  };

  // sort products
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      // (sortType) checks the current value of sortType and runs different code depending on what it is — think of switch as a cleaner way of writing multiple if / else if checks.
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        //.sort() compares products two at a time — a and b. If a.price - b.price is negative, a comes first (it's cheaper). If it's positive, b comes first. This naturally arranges everything from lowest price to highest.
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        // same logic but just flipped the logic this time to show the highest to lowest
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Showing products using useEffect
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);
  // This says: "Watch category and subCategory. Any time either one changes, automatically run applyFilter() again."

  useEffect(() => {
    sortProduct();
    // So the moment sortType changes (user picks a new dropdown option), sortProduct() automatically runs and re-sorts what's on screen.
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t">
      {/* Filters Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-2 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>
        {/* Sub Category filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-2 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-700 text-sm px-2"
          >
            <option value="relavent">Sort by Relavent</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
