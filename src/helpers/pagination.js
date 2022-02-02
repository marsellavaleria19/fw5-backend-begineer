const pagination = (data, total, page, route) => {
    const last = Math.ceil(total / data.limit);
    const url = `http://localhost:5000/${route}?page=`;
    return {
        prev: page > last ? `${url}${page-1}` : null,
        next: page < last ? `${url}${page+1}` : null,
        totalData: total,
        currentPage: page,
        lastPage: last
    };
};

module.exports = { pagination };