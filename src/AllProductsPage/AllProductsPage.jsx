import React from "react";

function AllProductsPage() {
  return (
    <div>
      <div className="border border-black py-3 my-10 px-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Watch
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Sports
          </Link>
          <Typography color="text.primary">AeroSport</Typography>
        </Breadcrumbs>
      </div>
      <div className="mx-4 my-10">
        <h2 className="text-3xl">Example</h2>
      </div>
      <div className="grid phone:grid-cols-2 tabletLandscape:grid-cols-3 gap-3">
        <div className="flex flex-col justify-center items-center">
          <img
            src="watch1.png"
            alt="watch"
            className="w-80 h-auto bg-auto mb-5"
          />
          <div className="flex flex-col text-center">
            <h4 className="mt-2 text-xl">CHRONOTRIGGER</h4>
            <span className="text-sm">$2390</span>
            <div className="my-5">
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#0F0703" }}
              >
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProductsPage;
