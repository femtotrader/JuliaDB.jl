var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Home",
    "title": "Home",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "index.html#JuliaDB-1",
    "page": "Home",
    "title": "JuliaDB",
    "category": "section",
    "text": "(Image: )"
},

{
    "location": "index.html#Overview-1",
    "page": "Home",
    "title": "Overview",
    "category": "section",
    "text": "JuliaDB is a package for working with persistent data sets.We recognized the need for an all-Julia, end-to-end tool that canLoad multi-dimensional datasets quickly and incrementally.\nIndex the data and perform filter, aggregate, sort and join operations.\nSave results and load them efficiently later.\nReadily use Julia\'s built-in parallelism to fully utilize any machine or cluster.We built JuliaDB to fill this void.JuliaDB provides distributed table and array datastructures with convenient functions to load data from CSV. JuliaDB is Julia all the way down. This means queries can be composed with Julia code that may use a vast ecosystem of packages."
},

{
    "location": "index.html#Getting-started-1",
    "page": "Home",
    "title": "Getting started",
    "category": "section",
    "text": "JuliaDB works on Julia 0.6. To install it, run:Pkg.add(\"JuliaDB\")To use JuliaDB, you may start Julia with a few worker processes (julia -p N) or, alternatively, run addprocs(N) before runningusing JuliaDBMultiple processes may not be benificial for datasets with less than a few million rows. Communication costs are eliminated on a single process, but of course you will be using a single CPU."
},

{
    "location": "index.html#Resources-1",
    "page": "Home",
    "title": "Resources",
    "category": "section",
    "text": "API Reference\nOut-of-core processing\nIssue tracker\nSource code\nSlack channel"
},

{
    "location": "api/index.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": "CurrentModule = JuliaDB\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/index.html#JuliaDB-API-Reference-1",
    "page": "API Reference",
    "title": "JuliaDB API Reference",
    "category": "section",
    "text": ""
},

{
    "location": "api/index.html#[Data-structures](@ref)-1",
    "page": "API Reference",
    "title": "Data structures",
    "category": "section",
    "text": "Core data structures and indexing.Table - JuliaDB\'s table datastructure\nNDSparse - N-dimensional sparse array datastructure\nreindex - set a different index for a dataset\nrechunk - re-distribute a distributed dataset"
},

{
    "location": "api/index.html#[Selection](@ref)-1",
    "page": "API Reference",
    "title": "Selection",
    "category": "section",
    "text": "Select subsets of columns, map, and filter.select - select and transform a column or a subset of columns\nmap - apply a function row-wise\nfilter - filter rows\ndropna - drop rows with NA values\ncolumns - extract struct of column vectors\nrows - extract vector of structs\nkeys - vector of keys of an NDSparse\nvalues - vector of values of an NDSparseDerivatives of select that are convenient for modifying a table\'s columns.setcol - replace a column\npushcol - add a column at the end\npopcol - remove a column\ninsertcol - insert a column\ninsertcolafter - insert a column after another\ninsertcolbefore - insert a column before another\nrenamecol - rename a column"
},

{
    "location": "api/index.html#[Aggregation](@ref)-1",
    "page": "API Reference",
    "title": "Aggregation",
    "category": "section",
    "text": "Grouping and reduction with functions or Online statistics.reduce - aggregate a dataset using functions or OnlineStats\ngroupreduce - aggregate groups of rows using functions or OnlineStats\ngroupby - collect groups of rows together\nsummarize - apply summary functions to selected columns\nreducedim - drop a dimension in NDSparse and aggregate"
},

{
    "location": "api/index.html#[Joins](@ref)-1",
    "page": "API Reference",
    "title": "Joins",
    "category": "section",
    "text": "Combine two or more tables in various join and merge operations.join - join two datasets\ngroupjoin - join two datasets by grouping (no nullables!)\nmerge - merge two datasets\nasofjoin - time series asof-join"
},

{
    "location": "api/index.html#[Loading-and-saving](@ref)-1",
    "page": "API Reference",
    "title": "Loading and saving",
    "category": "section",
    "text": "loadtable - load a Table from CSV or binary data\nloadndsparse - load an NDSparse from CSV or binary data\nsave - save a Table or NDSparse to in an efficient format"
},

{
    "location": "api/datastructures.html#",
    "page": "Data Structures",
    "title": "Data Structures",
    "category": "page",
    "text": "CurrentModule = IndexedTables\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/datastructures.html#Data-structures-1",
    "page": "Data Structures",
    "title": "Data structures",
    "category": "section",
    "text": ""
},

{
    "location": "api/datastructures.html#IndexedTables.table",
    "page": "Data Structures",
    "title": "IndexedTables.table",
    "category": "Function",
    "text": "table(cols::AbstractVector...; names, <options>)\n\nCreate a table with columns given by cols.\n\njulia> a = table([1,2,3], [4,5,6])\nTable with 3 rows, 2 columns:\n1  2\n────\n1  4\n2  5\n3  6\n\nnames specify names for columns. If specified, the table will be an iterator of named tuples.\n\njulia> b = table([1,2,3], [4,5,6], names=[:x, :y])\nTable with 3 rows, 2 columns:\nx  y\n────\n1  4\n2  5\n3  6\n\n\ntable(cols::Union{Tuple, NamedTuple}; <options>)\n\nConvert a struct of columns to a table of structs.\n\njulia> table(([1,2,3], [4,5,6])) == a\ntrue\n\njulia> table(@NT(x=[1,2,3], y=[4,5,6])) == b\ntrue\n\ntable(cols::Columns; <options>)\n\nConstruct a table from a vector of tuples. See rows.\n\njulia> table(Columns([1,2,3], [4,5,6])) == a\ntrue\n\njulia> table(Columns(x=[1,2,3], y=[4,5,6])) == b\ntrue\n\ntable(t::Union{Table, NDSparse}; <options>)\n\nCopy a Table or NDSparse to create a new table. The same primary keys as the input are used.\n\njulia> b == table(b)\ntrue\n\ntable(iter; <options>)\n\nConstruct a table from an iterable table.\n\nOptions:\n\npkey: select columns to act as the primary key. By default, no columns are used as primary key.\npresorted: is the data pre-sorted by primary key columns? If so, skip sorting. false by default. Irrelevant if chunks is specified.\ncopy: creates a copy of the input vectors if true. true by default. Irrelavant if chunks is specified.\nchunks: distribute the table into chunks (Integer) chunks (a safe bet is nworkers()). Table is not distributed by default. See Distributed docs.\n\nExamples:\n\nSpecifying pkey will cause the table to be sorted by the columns named in pkey:\n\njulia> b = table([2,3,1], [4,5,6], names=[:x, :y], pkey=:x)\nTable with 3 rows, 2 columns:\nx  y\n────\n1  6\n2  4\n3  5\n\njulia> b = table([2,1,2,1],[2,3,1,3],[4,5,6,7],\n                 names=[:x, :y, :z], pkey=(:x,:y))\nTable with 4 rows, 3 columns:\nx  y  z\n───────\n1  3  5\n1  3  7\n2  1  6\n2  2  4\n\nNote that the keys do not have to be unique.\n\nchunks option creates a distributed table.\n\nchunks can be:\n\nAn integer – number of chunks to create\nAn vector of k integers – number of elements in each of the k chunks.\nThe distribution of another array. i.e. vec.subdomains where vec is a distributed array.\n\njulia> t = table([2,3,1,4], [4,5,6,7],\n                  names=[:x, :y], pkey=:x, chunks=2)\nDistributed Table with 4 rows in 2 chunks:\nx  y\n────\n1  6\n2  4\n3  5\n4  7\n\nA distributed table will be constructed if one of the arrays passed into table constructor is a distributed array. A distributed Array can be constructed using distribute:\n\n\njulia> x = distribute([1,2,3,4], 2);\n\njulia> t = table(x, [5,6,7,8], names=[:x,:y])\nDistributed Table with 4 rows in 2 chunks:\nx  y\n────\n1  5\n2  6\n3  7\n4  8\n\njulia> table(columns(t)..., [9,10,11,12],\n             names=[:x,:y,:z])\nDistributed Table with 4 rows in 2 chunks:\nx  y  z\n────────\n1  5  9\n2  6  10\n3  7  11\n4  8  12\n\n\nDistribution is done to match the first distributed column from left to right. Specify chunks to override this.\n\n\n\n"
},

{
    "location": "api/datastructures.html#Table-1",
    "page": "Data Structures",
    "title": "Table",
    "category": "section",
    "text": "A Table is a collection of tuples or named tuples. These tuples are \"rows\" of the table. The values of the same field in all rows form a \"column\". A Table can be constructed by passing the columns to the table function. The names argument sets the names of the columns:julia> t = table([1,2,3], [4,5,6], names=[:x, :y])\nTable with 3 rows, 2 columns:\nx  y\n────\n1  4\n2  5\n3  6Since a table iterates over rows, indexing with an iteger will return the row at that position:julia> row = t[2]\n(x = 2, y = 5)\n\njulia> row.x\n2\n\njulia> row.y\n5The returned value is a named tuple in this case.Further, indexing a table with a range of indices or generally any array of integer indices will return a new table with those subset of rows.julia> t[2:3]\nTable with 2 rows, 2 columns:\nx  y\n────\n2  5\n3  6\n\njulia> t[[1,1,3]]\nTable with 3 rows, 2 columns:\nx  y\n────\n1  4\n1  4\n3  6\nOptionally, a subset of fields can be chosen as \"primary key\". The rows are kept sorted in lexicographic order of the primary key fields. The benefits are:It makes lookup, grouping, join and sort operations fast when the primary key fields are involved.\nIt provides a natural default for operations such as groupby and joinPassing the pkey option to table constructor will select the primary keys.julia> b = table([2,1,2,1],[2,3,1,3],[4,5,6,7], names=[:x,:y,:z], pkey=(:x,:y))\nTable with 4 rows, 3 columns:\nx  y  z\n───────\n1  3  5\n1  3  7\n2  1  6\n2  2  4Note that the output table is sorted by the primary key fields.Below is the full documentation of the table constructor:table"
},

{
    "location": "api/datastructures.html#IndexedTables.ndsparse",
    "page": "Data Structures",
    "title": "IndexedTables.ndsparse",
    "category": "Function",
    "text": "ndsparse(indices, data; agg, presorted, copy, chunks)\n\nConstruct an NDSparse array with the given indices and data. Each vector in indices represents the index values for one dimension. On construction, the indices and data are sorted in lexicographic order of the indices.\n\nArguments:\n\nagg::Function: If indices contains duplicate entries, the corresponding data items are reduced using this 2-argument function.\npresorted::Bool: If true, the indices are assumed to already be sorted and no sorting is done.\ncopy::Bool: If true, the storage for the new array will not be shared with the passed indices and data. If false (the default), the passed arrays will be copied only if necessary for sorting. The only way to guarantee sharing of data is to pass presorted=true.\nchunks::Integer: distribute the table into chunks (Integer) chunks (a safe bet is nworkers()). Not distributed by default. See Distributed docs.\n\nExamples:\n\n1-dimensional NDSparse can be constructed with a single array as index.\n\njulia> x = ndsparse([\"a\",\"b\"],[3,4])\n1-d NDSparse with 2 values (Int64):\n1   │\n────┼──\n\"a\" │ 3\n\"b\" │ 4\n\njulia> keytype(x), eltype(x)\n(Tuple{String}, Int64)\n\n\nA dimension will be named if constructed with a named tuple of columns as index.\n\njulia> x = ndsparse(@NT(date=Date.(2014:2017)), [4:7;])\n1-d NDSparse with 4 values (Int64):\ndate       │\n───────────┼──\n2014-01-01 │ 4\n2015-01-01 │ 5\n2016-01-01 │ 6\n2017-01-01 │ 7\n\n\njulia> x[Date(\"2015-01-01\")]\n5\n\njulia> keytype(x), eltype(x)\n(Tuple{Date}, Int64)\n\n\nMulti-dimensional NDSparse can be constructed by passing a tuple of index columns:\n\njulia> x = ndsparse(([\"a\",\"b\"],[3,4]), [5,6])\n2-d NDSparse with 2 values (Int64):\n1    2 │\n───────┼──\n\"a\"  3 │ 5\n\"b\"  4 │ 6\n\njulia> keytype(x), eltype(x)\n(Tuple{String,Int64}, Int64)\n\njulia> x[\"a\", 3]\n5\n\nThe data itself can also contain tuples (these are stored in columnar format, just like in table.)\n\njulia> x = ndsparse(([\"a\",\"b\"],[3,4]), ([5,6], [7.,8.]))\n2-d NDSparse with 2 values (2-tuples):\n1    2 │ 3  4\n───────┼───────\n\"a\"  3 │ 5  7.0\n\"b\"  4 │ 6  8.0\n\njulia> x = ndsparse(@NT(x=[\"a\",\"a\",\"b\"],y=[3,4,4]),\n                    @NT(p=[5,6,7], q=[8.,9.,10.]))\n2-d NDSparse with 3 values (2 field named tuples):\nx    y │ p  q\n───────┼────────\n\"a\"  3 │ 5  8.0\n\"a\"  4 │ 6  9.0\n\"b\"  4 │ 7  10.0\n\njulia> keytype(x), eltype(x)\n(Tuple{String,Int64}, NamedTuples._NT_p_q{Int64,Float64})\n\njulia> x[\"a\", :]\n2-d NDSparse with 2 values (2 field named tuples):\nx    y │ p  q\n───────┼───────\n\"a\"  3 │ 5  8.0\n\"a\"  4 │ 6  9.0\n\n\nPassing a chunks option to ndsparse, or constructing with a distributed array will cause the result to be distributed. Use distribute function to distribute an array.\n\njulia> x = ndsparse(@NT(date=Date.(2014:2017)), [4:7.;], chunks=2)\n1-d Distributed NDSparse with 4 values (Float64) in 2 chunks:\ndate       │\n───────────┼────\n2014-01-01 │ 4.0\n2015-01-01 │ 5.0\n2016-01-01 │ 6.0\n2017-01-01 │ 7.0\n\njulia> x = ndsparse(@NT(date=Date.(2014:2017)), distribute([4:7.0;], 2))\n1-d Distributed NDSparse with 4 values (Float64) in 2 chunks:\ndate       │\n───────────┼────\n2014-01-01 │ 4.0\n2015-01-01 │ 5.0\n2016-01-01 │ 6.0\n2017-01-01 │ 7.0\n\nDistribution is done to match the first distributed column from left to right. Specify chunks to override this.\n\n\n\n"
},

{
    "location": "api/datastructures.html#NDSparse-1",
    "page": "Data Structures",
    "title": "NDSparse",
    "category": "section",
    "text": "An NDSparse object is a collection of values sparsely distributed over domains which may be discrete or continuous. For example, stock prices are sparsely distributed over the domains of stock ticker symbols, and timestamps.julia> prices = ndsparse(@NT(ticker=[\"GOOG\", \"GOOG\", \"KO\", \"KO\"],\n                         date=Date.([\"2017-11-10\", \"2017-11-11\",\n                                     \"2017-11-10\", \"2017-11-11\"])),\n                         [1029.74, 1028.23, 46.23, 46.53])\n2-d NDSparse with 4 values (Float64):\nticker  date       │\n───────────────────┼────────\n\"GOOG\"  2017-11-10 │ 1029.74\n\"GOOG\"  2017-11-11 │ 1028.23\n\"KO\"    2017-11-10 │ 46.23\n\"KO\"    2017-11-11 │ 46.53NDSparse maps tuples of indices of arbitrary types to values, just like an Array maps tuples of integer indices to values. Here, the indices are shown to the left of the vertical line, while the values they map to are to the right.The indexing syntax can be used for lookup:julia> prices[\"KO\", Date(\"2017-11-10\")]\n46.23\n\njulia> prices[\"KO\", :]\n2-d NDSparse with 2 values (Float64):\nticker  date       │\n───────────────────┼──────\n\"KO\"    2017-11-10 │ 46.23\n\"KO\"    2017-11-11 │ 46.53\n\njulia> prices[:, Date(\"2017-11-10\")]\n2-d NDSparse with 2 values (Float64):\nticker  date       │\n───────────────────┼────────\n\"GOOG\"  2017-11-10 │ 1029.74\n\"KO\"    2017-11-10 │ 46.23Similarly, other array operations like broadcast, reducedim, and mapslices are defined for NDSparse as for Arrays.An NDSparse is constructed using the ndsparse function.ndsparse"
},

{
    "location": "api/datastructures.html#IndexedTables.reindex",
    "page": "Data Structures",
    "title": "IndexedTables.reindex",
    "category": "Function",
    "text": "reindex(t::Table, by[, select])\n\nReindex t by columns selected in by. Keeps columns selected by select as non-indexed columns. By default all columns not mentioned in by are kept.\n\nUse selectkeys to reindex and NDSparse object.\n\njulia> t = table([2,1],[1,3],[4,5], names=[:x,:y,:z], pkey=(1,2))\n\njulia> reindex(t, (:y, :z))\nTable with 2 rows, 3 columns:\ny  z  x\n───────\n1  4  2\n3  5  1\n\njulia> pkeynames(t)\n(:y, :z)\n\njulia> reindex(t, (:w=>[4,5], :z))\nTable with 2 rows, 4 columns:\nw  z  x  y\n──────────\n4  5  1  3\n5  4  2  1\n\njulia> pkeynames(t)\n(:w, :z)\n\n\n\n\n"
},

{
    "location": "api/datastructures.html#Indexing-1",
    "page": "Data Structures",
    "title": "Indexing",
    "category": "section",
    "text": "This section describes the reindex and rechunk functions which let you change the indexed columns in a table or NDSparse, and sort the contents of a distributed table or NDSparse respectively.reindexrechunk"
},

{
    "location": "api/selection.html#",
    "page": "Selection",
    "title": "Selection",
    "category": "page",
    "text": "CurrentModule = IndexedTables\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/selection.html#Selection-1",
    "page": "Selection",
    "title": "Selection",
    "category": "section",
    "text": "Select, transform and filter a table."
},

{
    "location": "api/selection.html#Base.Sort.select",
    "page": "Selection",
    "title": "Base.Sort.select",
    "category": "Function",
    "text": "select(t::Table, which::Selection)\n\nSelect all or a subset of columns, or a single column from the table.\n\nSelection is a type union of many types that can select from a table. It can be:\n\nInteger – returns the column at this position.\nSymbol – returns the column with this name.\nPair{Selection => Function} – selects and maps a function over the selection, returns the result.\nAbstractArray – returns the array itself. This must be the same length as the table.\nTuple of Selection – returns a table containing a column for every selector in the tuple. The tuple may also contain the type Pair{Symbol, Selection}, which the selection a name. The most useful form of this when introducing a new column.\n\nExamples:\n\nSelection with Integer – returns the column at this position.\n\njulia> tbl = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> select(tbl, 2)\n2-element Array{Int64,1}:\n 2\n 1\n\n\nSelection with Symbol – returns the column with this name.\n\njulia> select(tbl, :t)\n2-element Array{Float64,1}:\n 0.01\n 0.05\n\n\nSelection with Pair{Selection => Function} – selects some columns and maps a function over it, then returns the mapped column.\n\njulia> select(tbl, :t=>t->1/t)\n2-element Array{Float64,1}:\n 100.0\n  20.0\n\n\nSelection with AbstractArray – returns the array itself.\n\njulia> select(tbl, [3,4])\n2-element Array{Int64,1}:\n 3\n 4\n\n\nSelection with Tuple– returns a table containing a column for every selector in the tuple.\n\njulia> select(tbl, (2,1))\nTable with 2 rows, 2 columns:\nx  t\n───────\n2  0.01\n1  0.05\n\njulia> vx = select(tbl, (:x, :t)=>p->p.x/p.t)\n2-element Array{Float64,1}:\n 200.0\n  20.0\n\njulia> select(tbl, (:x,:t=>-))\nTable with 2 rows, 2 columns:\nx  t\n────────\n1  -0.05\n2  -0.01\n\nNote that since tbl was initialized with t as the primary key column, selections that retain the key column will retain its status as a key. The same applies when multiple key columns are selected.\n\nSelection with a custom array in the tuple will cause the name of the columns to be removed and replaced with integers.\n\njulia> select(tbl, (:x, :t, [3,4]))\nTable with 2 rows, 3 columns:\n1  2     3\n──────────\n2  0.01  3\n1  0.05  4\n\nThis is because the third column\'s name is unknown. In general if a column\'s name cannot be determined, then selection returns an iterable of tuples rather than named tuples. In other words, it strips column names.\n\nTo specify a new name to a custom column, you can use Symbol => Selection selector.\n\njulia> select(tbl, (:x,:t,:z=>[3,4]))\nTable with 2 rows, 3 columns:\nx  t     z\n──────────\n2  0.01  3\n1  0.05  4\n\njulia> select(tbl, (:x, :t, :minust=>:t=>-))\nTable with 2 rows, 3 columns:\nx  t     minust\n───────────────\n2  0.01  -0.01\n1  0.05  -0.05\n\njulia> select(tbl, (:x, :t, :vx=>(:x,:t)=>p->p.x/p.t))\nTable with 2 rows, 3 columns:\nx  t     vx\n──────────────\n2  0.01  200.0\n1  0.05  20.0\n\n\n\n\n"
},

{
    "location": "api/selection.html#Select-1",
    "page": "Selection",
    "title": "Select",
    "category": "section",
    "text": "select"
},

{
    "location": "api/selection.html#Base.map-Tuple{Any,IndexedTables.NextTable}",
    "page": "Selection",
    "title": "Base.map",
    "category": "Method",
    "text": "map(f, t::Table; select)\n\nApply f to every row in t. select selects fields passed to f.\n\nReturns a new table if f returns a tuple or named tuple. If not, returns a vector.\n\nExamples\n\njulia> t = table([0.01, 0.05], [1,2], [3,4], names=[:t, :x, :y])\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  1  3\n0.05  2  4\n\njulia> manh = map(row->row.x + row.y, t)\n2-element Array{Int64,1}:\n 4\n 6\n\njulia> polar = map(p->@NT(r=hypot(p.x + p.y), θ=atan2(p.y, p.x)), t)\nTable with 2 rows, 2 columns:\nr    θ\n────────────\n4.0  1.24905\n6.0  1.10715\n\n\nselect argument selects a subset of columns while iterating.\n\n\njulia> vx = map(row->row.x/row.t, t, select=(:t,:x)) # row only cotains t and x\n2-element Array{Float64,1}:\n 100.0\n  40.0\n\njulia> map(sin, polar, select=:θ)\n2-element Array{Float64,1}:\n 0.948683\n 0.894427\n\n\n\n\n"
},

{
    "location": "api/selection.html#Base.map-Tuple{Any,IndexedTables.NDSparse}",
    "page": "Selection",
    "title": "Base.map",
    "category": "Method",
    "text": "map(f, x::NDSparse; select)\n\nApply f to every data value in x. select selects fields passed to f. By default, the data values are selected.\n\nIf the return value of f is a tuple or named tuple the result will contain many data columns.\n\nExamples\n\njulia> x = ndsparse(@NT(t=[0.01, 0.05]), @NT(x=[1,2], y=[3,4]))\n1-d NDSparse with 2 values (2 field named tuples):\nt    │ x  y\n─────┼─────\n0.01 │ 1  3\n0.05 │ 2  4\n\njulia> manh = map(row->row.x + row.y, x)\n1-d NDSparse with 2 values (Int64):\nt    │\n─────┼──\n0.01 │ 4\n0.05 │ 6\n\njulia> vx = map(row->row.x/row.t, x, select=(:t,:x))\n1-d NDSparse with 2 values (Float64):\nt    │\n─────┼──────\n0.01 │ 100.0\n0.05 │ 40.0\n\njulia> polar = map(p->@NT(r=hypot(p.x + p.y), θ=atan2(p.y, p.x)), x)\n1-d NDSparse with 2 values (2 field named tuples):\nt    │ r    θ\n─────┼─────────────\n0.01 │ 4.0  1.24905\n0.05 │ 6.0  1.10715\n\njulia> map(sin, polar, select=:θ)\n1-d NDSparse with 2 values (Float64):\nt    │\n─────┼─────────\n0.01 │ 0.948683\n0.05 │ 0.894427\n\n\n\n\n"
},

{
    "location": "api/selection.html#Map-1",
    "page": "Selection",
    "title": "Map",
    "category": "section",
    "text": "map(f, t::NextTable; kwargs...)map(f, t::NDSparse; kwargs...)"
},

{
    "location": "api/selection.html#Base.filter",
    "page": "Selection",
    "title": "Base.filter",
    "category": "Function",
    "text": "filter(pred, t::Union{NextTable, NDSparse}; select)\n\nFilter rows in t according to pred. select choses the fields that act as input to pred.\n\npred can be:\n\nA function - selected structs or values are passed to this function\nA tuple of column => function pairs: applies to each named column the corresponding function, keeps only rows where all such conditions are satisfied.\n\nBy default, filter iterates a table a row at a time:\n\njulia> t = table([\"a\",\"b\",\"c\"], [0.01, 0.05, 0.07], [2,1,0],\n                 names=[:n, :t, :x])\nTable with 3 rows, 3 columns:\nn    t     x\n────────────\n\"a\"  0.01  2\n\"b\"  0.05  1\n\"c\"  0.07  0\n\njulia> filter(p->p.x/p.t < 100, t) # whole row\nTable with 2 rows, 3 columns:\nn    t     x\n────────────\n\"b\"  0.05  1\n\"c\"  0.07  0\n\n\nBy default, filter iterates by values of an NDSparse:\n\njulia> x = ndsparse(@NT(n=[\"a\",\"b\",\"c\"], t=[0.01, 0.05, 0.07]), [2,1,0])\n2-d NDSparse with 3 values (Int64):\nn    t    │\n──────────┼──\n\"a\"  0.01 │ 2\n\"b\"  0.05 │ 1\n\"c\"  0.07 │ 0\n\njulia> filter(y->y<2, x)\n2-d NDSparse with 2 values (Int64):\nn    t    │\n──────────┼──\n\"b\"  0.05 │ 1\n\"c\"  0.07 │ 0\n\nIf select is specified. (See Selection convention) then, the selected values will be iterated instead.\n\njulia> filter(iseven, t, select=:x)\nTable with 2 rows, 3 columns:\nn    t     x\n────────────\n\"a\"  0.01  2\n\"c\"  0.07  0\n\njulia> filter(p->p.x/p.t < 100, t, select=(:x,:t))\nTable with 2 rows, 3 columns:\nn    t     x\n────────────\n\"b\"  0.05  1\n\"c\"  0.07  0\n\nselect works similarly for NDSparse:\n\njulia> filter(p->p[2]/p[1] < 100, x, select=(:t, 3))\n2-d NDSparse with 2 values (Int64):\nn    t    │\n──────────┼──\n\"b\"  0.05 │ 1\n\"c\"  0.07 │ 0\n\nHere 3 represents the third column, which is the values, p is a tuple of t field and the value.\n\nFiltering by many single columns can be done by passing a tuple of column_name => function pairs.\n\njulia> filter((:x=>iseven, :t=>a->a>0.01), t)\nTable with 1 rows, 3 columns:\nn    t     x\n────────────\n\"c\"  0.07  0\n\njulia> filter((3=>iseven, :t=>a->a>0.01), x) # NDSparse\n2-d NDSparse with 1 values (Int64):\nn    t    │\n──────────┼──\n\"c\"  0.07 │ 0\n\n\n\n\nfilter(f, t::DNDSparse)\n\nFilters t removing rows for which f is false. f is passed only the data and not the index.\n\n\n\n"
},

{
    "location": "api/selection.html#DataValues.dropna",
    "page": "Selection",
    "title": "DataValues.dropna",
    "category": "Function",
    "text": "dropna(t[, select])\n\nDrop rows which contain NA values.\n\njulia> t = table([0.1, 0.5, NA,0.7], [2,NA,4,5], [NA,6,NA,7],\n                  names=[:t,:x,:y])\nTable with 4 rows, 3 columns:\nt    x    y\n─────────────\n0.1  2    #NA\n0.5  #NA  6\n#NA  4    #NA\n0.7  5    7\n\njulia> dropna(t)\nTable with 1 rows, 3 columns:\nt    x  y\n─────────\n0.7  5  7\n\nOptionally select can be speicified to limit columns to look for NAs in.\n\n\njulia> dropna(t, :y)\nTable with 2 rows, 3 columns:\nt    x    y\n───────────\n0.5  #NA  6\n0.7  5    7\n\njulia> t1 = dropna(t, (:t, :x))\nTable with 2 rows, 3 columns:\nt    x  y\n───────────\n0.1  2  #NA\n0.7  5  7\n\nAny columns whose NA rows have been dropped will be converted to non-na array type. In our last example, columns t and x got converted from Array{DataValue{Int}} to Array{Int}. Similarly if the vectors are of type DataValueArray{T} (default for loadtable) they will be converted to Array{T}.\n\njulia> typeof(column(dropna(t,:x), :x))\nArray{Int64,1}\n\n\n\n"
},

{
    "location": "api/selection.html#Filter-1",
    "page": "Selection",
    "title": "Filter",
    "category": "section",
    "text": "filterdropna"
},

{
    "location": "api/selection.html#IndexedTables.columns",
    "page": "Selection",
    "title": "IndexedTables.columns",
    "category": "Function",
    "text": "columns(itr[, select::Selection])\n\nSelect one or more columns from an iterable of rows as a tuple of vectors.\n\nselect specifies which columns to select. See Selection convention for possible values. If unspecified, returns all columns.\n\nitr can be NDSparse, Columns and AbstractVector, and their distributed counterparts.\n\nExamples\n\njulia> t = table([1,2],[3,4], names=[:x,:y])\nTable with 2 rows, 2 columns:\nx  y\n────\n1  3\n2  4\n\njulia> columns(t)\n(x = [1, 2], y = [3, 4])\n\njulia> columns(t, :x)\n2-element Array{Int64,1}:\n 1\n 2\n\njulia> columns(t, (:x,))\n(x = [1, 2])\n\njulia> columns(t, (:y,:x=>-))\n(y = [3, 4], x = [-1, -2])\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.rows",
    "page": "Selection",
    "title": "IndexedTables.rows",
    "category": "Function",
    "text": "rows(itr[, select::Selection])\n\nSelect one or more fields from an iterable of rows as a vector of their values.\n\nselect specifies which fields to select. See Selection convention for possible values. If unspecified, returns all columns.\n\nitr can be NDSparse, Columns and AbstractVector, and their distributed counterparts.\n\nExamples\n\njulia> t = table([1,2],[3,4], names=[:x,:y])\nTable with 2 rows, 2 columns:\nx  y\n────\n1  3\n2  4\n\njulia> rows(t)\n2-element IndexedTables.Columns{NamedTuples._NT_x_y{Int64,Int64},NamedTuples._NT_x_y{Array{Int64,1},Array{Int64,1}}}:\n (x = 1, y = 3)\n (x = 2, y = 4)\n\njulia> rows(t, :x)\n2-element Array{Int64,1}:\n 1\n 2\n\njulia> rows(t, (:x,))\n2-element IndexedTables.Columns{NamedTuples._NT_x{Int64},NamedTuples._NT_x{Array{Int64,1}}}:\n (x = 1)\n (x = 2)\n\njulia> rows(t, (:y,:x=>-))\n2-element IndexedTables.Columns{NamedTuples._NT_y_x{Int64,Int64},NamedTuples._NT_y_x{Array{Int64,1},Array{Int64,1}}}:\n (y = 3, x = -1)\n (y = 4, x = -2)\n\nNote that vectors of tuples returned are Columns object and have columnar internal storage.\n\n\n\n"
},

{
    "location": "api/selection.html#Base.keys",
    "page": "Selection",
    "title": "Base.keys",
    "category": "Function",
    "text": "keys(x::NDSparse[, select::Selection])\n\nGet the keys of an NDSparse object. Same as rows but acts only on the index columns of the NDSparse.\n\n\n\n"
},

{
    "location": "api/selection.html#Base.values",
    "page": "Selection",
    "title": "Base.values",
    "category": "Function",
    "text": "values(x::NDSparse[, select::Selection])\n\nGet the values of an NDSparse object. Same as rows but acts only on the value columns of the NDSparse.\n\n\n\n"
},

{
    "location": "api/selection.html#AoS-and-SoA-1",
    "page": "Selection",
    "title": "AoS and SoA",
    "category": "section",
    "text": "This section describes extracting struct of arrays (columns) and array of structs (rows) from a table or an NDSparse. (Wikipedia entry on AoS and SoA)columnsrowskeysvalues"
},

{
    "location": "api/selection.html#IndexedTables.setcol",
    "page": "Selection",
    "title": "IndexedTables.setcol",
    "category": "Function",
    "text": "setcol(t::Table, col::Union{Symbol, Int}, x::Selection)\n\nSets a x as the column identified by col. Returns a new table.\n\nsetcol(t::Table, map::Pair...)\n\nSet many columns at a time.\n\nExamples:\n\njulia> t = table([1,2], [3,4], names=[:x, :y])\nTable with 2 rows, 2 columns:\nx  y\n────\n1  3\n2  4\n\njulia> setcol(t, 2, [5,6])\nTable with 2 rows, 2 columns:\nx  y\n────\n1  5\n2  6\n\n\nx can be any selection that transforms existing columns.\n\njulia> setcol(t, :x, :x => x->1/x)\nTable with 2 rows, 2 columns:\nx    y\n──────\n1.0  5\n0.5  6\n\n\nsetcol will result in a re-sorted copy if a primary key column is replaced.\n\njulia> t = table([0.01, 0.05], [1,2], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  1  3\n0.05  2  4\n\njulia> t2 = setcol(t, :t, [0.1,0.05])\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.05  2  4\n0.1   1  3\n\njulia> t == t2\nfalse\n\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.pushcol",
    "page": "Selection",
    "title": "IndexedTables.pushcol",
    "category": "Function",
    "text": "pushcol(t, name, x)\n\nPush a column x to the end of the table. name is the name for the new column. Returns a new table.\n\nExample:\n\njulia> t = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> pushcol(t, :z, [1//2, 3//4])\nTable with 2 rows, 4 columns:\nt     x  y  z\n────────────────\n0.01  2  3  1//2\n0.05  1  4  3//4\n\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.popcol",
    "page": "Selection",
    "title": "IndexedTables.popcol",
    "category": "Function",
    "text": "popcol(t, col)\n\nRemove the column col from the table. Returns a new table.\n\njulia> t = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> popcol(t, :x)\nTable with 2 rows, 2 columns:\nt     y\n───────\n0.01  3\n0.05  4\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.insertcol",
    "page": "Selection",
    "title": "IndexedTables.insertcol",
    "category": "Function",
    "text": "insertcol(t, position::Integer, name, x)\n\nInsert a column x named name at position. Returns a new table.\n\njulia> t = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> insertcol(t, 2, :w, [0,1])\nTable with 2 rows, 4 columns:\nt     w  x  y\n─────────────\n0.01  0  2  3\n0.05  1  1  4\n\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.insertcolafter",
    "page": "Selection",
    "title": "IndexedTables.insertcolafter",
    "category": "Function",
    "text": "insertcolafter(t, after, name, col)\n\nInsert a column col named name after after. Returns a new table.\n\njulia> t = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> insertcolafter(t, :t, :w, [0,1])\nTable with 2 rows, 4 columns:\nt     w  x  y\n─────────────\n0.01  0  2  3\n0.05  1  1  4\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.insertcolbefore",
    "page": "Selection",
    "title": "IndexedTables.insertcolbefore",
    "category": "Function",
    "text": "insertcolbefore(t, before, name, col)\n\nInsert a column col named name before before. Returns a new table.\n\njulia> t = table([0.01, 0.05], [2,1], [3,4], names=[:t, :x, :y], pkey=:t)\nTable with 2 rows, 3 columns:\nt     x  y\n──────────\n0.01  2  3\n0.05  1  4\n\njulia> insertcolbefore(t, :x, :w, [0,1])\nTable with 2 rows, 4 columns:\nt     w  x  y\n─────────────\n0.01  0  2  3\n0.05  1  1  4\n\n\n\n"
},

{
    "location": "api/selection.html#IndexedTables.renamecol",
    "page": "Selection",
    "title": "IndexedTables.renamecol",
    "category": "Function",
    "text": "renamecol(t, col, newname)\n\nSet newname as the new name for column col in t. Returns a new table.\n\njulia> t = table([0.01, 0.05], [2,1], names=[:t, :x])\nTable with 2 rows, 2 columns:\nt     x\n───────\n0.01  2\n0.05  1\n\njulia> renamecol(t, :t, :time)\nTable with 2 rows, 2 columns:\ntime  x\n───────\n0.01  2\n0.05  1\n\n\n\n"
},

{
    "location": "api/selection.html#Column-modification-1",
    "page": "Selection",
    "title": "Column modification",
    "category": "section",
    "text": "This section describes functions that can modify the set of columns of a table. Note that these functions return new tables and doesn\'t mutate the existing table. This is done so that type information for a given table is always available and correct.setcolpushcolpopcolinsertcolinsertcolafterinsertcolbeforerenamecol"
},

{
    "location": "api/aggregation.html#",
    "page": "Aggregation",
    "title": "Aggregation",
    "category": "page",
    "text": "CurrentModule = JuliaDB\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/aggregation.html#Aggregation-1",
    "page": "Aggregation",
    "title": "Aggregation",
    "category": "section",
    "text": ""
},

{
    "location": "api/aggregation.html#Base.reduce",
    "page": "Aggregation",
    "title": "Base.reduce",
    "category": "Function",
    "text": "reduce(f, t::Table; select::Selection)\n\nReduce t by applying f pair-wise on values or structs selected by select.\n\nf can be:\n\nA function\nAn OnlineStat\nA tuple of functions and/or OnlineStats\nA named tuple of functions and/or OnlineStats\nA named tuple of (selector => function or OnlineStat) pairs\n\njulia> t = table([0.1, 0.5, 0.75], [0,1,2], names=[:t, :x])\nTable with 3 rows, 2 columns:\nt     x\n───────\n0.1   0\n0.5   1\n0.75  2\n\nWhen f is a function, it reduces the selection as usual:\n\njulia> reduce(+, t, select=:t)\n1.35\n\nIf select is omitted, the rows themselves are passed to reduce as tuples.\n\njulia> reduce((a, b) -> @NT(t=a.t+b.t, x=a.x+b.x), t)\n(t = 1.35, x = 3)\n\nIf f is an OnlineStat object from the OnlineStats package, the statistic is computed on the selection.\n\njulia> using OnlineStats\n\njulia> reduce(Mean(), t, select=:t)\n▦ Series{0,Tuple{Mean},EqualWeight}\n┣━━ EqualWeight(nobs = 3)\n┗━━━┓\n    ┗━━ Mean(0.45)\n\nReducing with multiple functions\n\nOften one needs many aggregate values from a table. This is when f can be passed as a tuple of functions:\n\njulia> y = reduce((min, max), t, select=:x)\n(min = 0, max = 2)\n\njulia> y.max\n2\n\njulia> y.min\n0\n\nNote that the return value of invoking reduce with a tuple of functions will be a named tuple which has the function names as the keys. In the example, we reduced using min and max functions to obtain the minimum and maximum values in column x.\n\nIf you want to give a different name to the fields in the output, use a named tuple as f instead:\n\njulia> y = reduce(@NT(sum=+, prod=*), t, select=:x)\n(sum = 3, prod = 0)\n\nYou can also compute many OnlineStats by passing tuple or named tuple of OnlineStat objects as the reducer.\n\njulia> y = reduce((Mean(), Variance()), t, select=:t)\n(Mean = ▦ Series{0,Tuple{Mean},EqualWeight}\n┣━━ EqualWeight(nobs = 3)\n┗━━━┓\n    ┗━━ Mean(0.45), Variance = ▦ Series{0,Tuple{Variance},EqualWeight}\n┣━━ EqualWeight(nobs = 3)\n┗━━━┓\n    ┗━━ Variance(0.1075))\n\njulia> y.Mean\n▦ Series{0,Tuple{Mean},EqualWeight}\n┣━━ EqualWeight(nobs = 3)\n┗━━━┓\n    ┗━━ Mean(0.45)\n\njulia> y.Variance\n▦ Series{0,Tuple{Variance},EqualWeight}\n┣━━ EqualWeight(nobs = 3)\n┗━━━┓\n    ┗━━ Variance(0.1075)\n\nCombining reduction and selection\n\nIn the above section where we computed many reduced values at once, we have been using the same selection for all reducers, that specified by select. It\'s possible to select different inputs for different reducers by using a named tuple of slector => function pairs:\n\njulia> reduce(@NT(xsum=:x=>+, negtsum=(:t=>-)=>+), t)\n(xsum = 3, negtsum = -1.35)\n\n\nSee Selection for more on what selectors can be specified. Here since each output can select its own input, select keyword is unsually unnecessary. If specified, the slections in the reducer tuple will be done over the result of selecting with the select argument.\n\n\n\n"
},

{
    "location": "api/aggregation.html#Reduce-1",
    "page": "Aggregation",
    "title": "Reduce",
    "category": "section",
    "text": "reduce"
},

{
    "location": "api/aggregation.html#IndexedTables.groupreduce",
    "page": "Aggregation",
    "title": "IndexedTables.groupreduce",
    "category": "Function",
    "text": "groupreduce(f, t[, by::Selection]; select::Selection)\n\nGroup rows by by, and apply f to reduce each group. f can be a function, OnlineStat or a struct of these as described in reduce. Recommended: see documentation for reduce first. The result of reducing each group is put in a table keyed by unique by values, the names of the output columns are the same as the names of the fields of the reduced tuples.\n\nExamples\n\njulia> t=table([1,1,1,2,2,2], [1,1,2,2,1,1], [1,2,3,4,5,6],\n               names=[:x,:y,:z]);\n\njulia> groupreduce(+, t, :x, select=:z)\nTable with 2 rows, 2 columns:\nx  +\n─────\n1  6\n2  15\n\njulia> groupreduce(+, t, (:x, :y), select=:z)\nTable with 4 rows, 3 columns:\nx  y  +\n────────\n1  1  3\n1  2  3\n2  1  11\n2  2  4\n\njulia> groupreduce((+, min, max), t, (:x, :y), select=:z)\nTable with 4 rows, 5 columns:\nx  y  +   min  max\n──────────────────\n1  1  3   1    2\n1  2  3   3    3\n2  1  11  5    6\n2  2  4   4    4\n\nIf f is a single function or a tuple of functions, the output columns will be named the same as the functions themselves. To change the name, pass a named tuple:\n\njulia> groupreduce(@NT(zsum=+, zmin=min, zmax=max), t, (:x, :y), select=:z)\nTable with 4 rows, 5 columns:\nx  y  zsum  zmin  zmax\n──────────────────────\n1  1  3     1     2\n1  2  3     3     3\n2  1  11    5     6\n2  2  4     4     4\n\nFinally, it\'s possible to select different inputs for different reducers by using a named tuple of slector => function pairs:\n\njulia> groupreduce(@NT(xsum=:x=>+, negysum=(:y=>-)=>+), t, :x)\nTable with 2 rows, 3 columns:\nx  xsum  negysum\n────────────────\n1  3     -4\n2  6     -4\n\n\n\n\n"
},

{
    "location": "api/aggregation.html#IndexedTables.groupby",
    "page": "Aggregation",
    "title": "IndexedTables.groupby",
    "category": "Function",
    "text": "groupby(f, t[, by::Selection]; select::Selection, flatten)\n\nGroup rows by by, and apply f to each group. f can be a function or a tuple of functions. The result of f on each group is put in a table keyed by unique by values. flatten will flatten the result and can be used when f returns a vector instead of a single scalar value.\n\nExamples\n\njulia> t=table([1,1,1,2,2,2], [1,1,2,2,1,1], [1,2,3,4,5,6],\n               names=[:x,:y,:z]);\n\njulia> groupby(mean, t, :x, select=:z)\nTable with 2 rows, 2 columns:\nx  mean\n───────\n1  2.0\n2  5.0\n\njulia> groupby(identity, t, (:x, :y), select=:z)\nTable with 4 rows, 3 columns:\nx  y  identity\n──────────────\n1  1  [1, 2]\n1  2  [3]\n2  1  [5, 6]\n2  2  [4]\n\njulia> groupby(mean, t, (:x, :y), select=:z)\nTable with 4 rows, 3 columns:\nx  y  mean\n──────────\n1  1  1.5\n1  2  3.0\n2  1  5.5\n2  2  4.0\n\nmultiple aggregates can be computed by passing a tuple of functions:\n\njulia> groupby((mean, std, var), t, :y, select=:z)\nTable with 2 rows, 4 columns:\ny  mean  std       var\n──────────────────────────\n1  3.5   2.38048   5.66667\n2  3.5   0.707107  0.5\n\njulia> groupby(@NT(q25=z->quantile(z, 0.25), q50=median,\n                   q75=z->quantile(z, 0.75)), t, :y, select=:z)\nTable with 2 rows, 4 columns:\ny  q25   q50  q75\n──────────────────\n1  1.75  3.5  5.25\n2  3.25  3.5  3.75\n\nFinally, it\'s possible to select different inputs for different functions by using a named tuple of slector => function pairs:\n\njulia> groupby(@NT(xmean=:z=>mean, ystd=(:y=>-)=>std), t, :x)\nTable with 2 rows, 3 columns:\nx  xmean  ystd\n─────────────────\n1  2.0    0.57735\n2  5.0    0.57735\n\nBy default, the result of groupby when f returns a vector or iterator of values will not be expanded. Pass the flatten option as true to flatten the grouped column:\n\njulia> t = table([1,1,2,2], [3,4,5,6], names=[:x,:y])\n\njulia> groupby((:normy => x->Iterators.repeated(mean(x), length(x)),),\n                t, :x, select=:y, flatten=true)\nTable with 4 rows, 2 columns:\nx  normy\n────────\n1  3.5\n1  3.5\n2  5.5\n2  5.5\n\nThe keyword option usekey = true allows to use information from the indexing column. f will need to accept two arguments, the first being the key (as a Tuple or NamedTuple) the second the data (as Columns).\n\njulia> t = table([1,1,2,2], [3,4,5,6], names=[:x,:y])\n\njulia> groupby((:x_plus_mean_y => (key, d) -> key.x + mean(d),),\n                              t, :x, select=:y, usekey = true)\nTable with 2 rows, 2 columns:\nx  x_plus_mean_y\n────────────────\n1  4.5\n2  7.5\n\n\n\n"
},

{
    "location": "api/aggregation.html#IndexedTables.flatten",
    "page": "Aggregation",
    "title": "IndexedTables.flatten",
    "category": "Function",
    "text": "flatten(t::Table, col)\n\nFlatten col column which may contain a vector of vectors while repeating the other fields.\n\nExamples:\n\njulia> x = table([1,2], [[3,4], [5,6]], names=[:x, :y])\nTable with 2 rows, 2 columns:\nx  y\n─────────\n1  [3, 4]\n2  [5, 6]\n\njulia> flatten(x, 2)\nTable with 4 rows, 2 columns:\nx  y\n────\n1  3\n1  4\n2  5\n2  6\n\njulia> x = table([1,2], [table([3,4],[5,6], names=[:a,:b]),\n                         table([7,8], [9,10], names=[:a,:b])], names=[:x, :y]);\n\njulia> flatten(x, :y)\nTable with 4 rows, 3 columns:\nx  a  b\n────────\n1  3  5\n1  4  6\n2  7  9\n2  8  10\n\n\n\n"
},

{
    "location": "api/aggregation.html#Grouping-1",
    "page": "Aggregation",
    "title": "Grouping",
    "category": "section",
    "text": "groupreducegroupbyflatten"
},

{
    "location": "api/aggregation.html#IndexedTables.summarize",
    "page": "Aggregation",
    "title": "IndexedTables.summarize",
    "category": "Function",
    "text": "summarize(f, t, by = pkeynames(t); select = excludecols(t, by))\n\nApply summary functions column-wise to a table. Return a NamedTuple in the non-grouped case and a table in the grouped case.\n\nExamples\n\njulia> t = table([1, 2, 3], [1, 1, 1], names = [:x, :y]);\n\njulia> summarize((mean, std), t)\n(x_mean = 2.0, y_mean = 1.0, x_std = 1.0, y_std = 0.0)\n\njulia> s = table([\"a\",\"a\",\"b\",\"b\"], [1,3,5,7], [2,2,2,2], names = [:x, :y, :z], pkey = :x);\n\njulia> summarize(mean, s)\nTable with 2 rows, 3 columns:\nx    y    z\n─────────────\n\"a\"  2.0  2.0\n\"b\"  6.0  2.0\n\nUse a NamedTuple to have different names for the summary functions:\n\njulia> summarize(@NT(m = mean, s = std), t)\n(x_m = 2.0, y_m = 1.0, x_s = 1.0, y_s = 0.0)\n\nUse select to only summarize some columns:\n\njulia> summarize(@NT(m = mean, s = std), t, select = :x)\n(m = 2.0, s = 1.0)\n\n\n\n"
},

{
    "location": "api/aggregation.html#Summarize-1",
    "page": "Aggregation",
    "title": "Summarize",
    "category": "section",
    "text": "summarize"
},

{
    "location": "api/aggregation.html#Base.reducedim",
    "page": "Aggregation",
    "title": "Base.reducedim",
    "category": "Function",
    "text": "reducedim(f, x::NDSparse, dims)\n\nDrop dims dimension(s) and aggregate with f.\n\njulia> x = ndsparse(@NT(x=[1,1,1,2,2,2],\n                        y=[1,2,2,1,2,2],\n                        z=[1,1,2,1,1,2]), [1,2,3,4,5,6])\n3-d NDSparse with 6 values (Int64):\nx  y  z │\n────────┼──\n1  1  1 │ 1\n1  2  1 │ 2\n1  2  2 │ 3\n2  1  1 │ 4\n2  2  1 │ 5\n2  2  2 │ 6\n\njulia> reducedim(+, x, 1)\n2-d NDSparse with 3 values (Int64):\ny  z │\n─────┼──\n1  1 │ 5\n2  1 │ 7\n2  2 │ 9\n\njulia> reducedim(+, x, (1,3))\n1-d NDSparse with 2 values (Int64):\ny │\n──┼───\n1 │ 5\n2 │ 16\n\n\n\n\n"
},

{
    "location": "api/aggregation.html#Reducedim-1",
    "page": "Aggregation",
    "title": "Reducedim",
    "category": "section",
    "text": "reducedim"
},

{
    "location": "api/joins.html#",
    "page": "Joins",
    "title": "Joins",
    "category": "page",
    "text": "CurrentModule = JuliaDB\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/joins.html#Base.join",
    "page": "Joins",
    "title": "Base.join",
    "category": "Function",
    "text": "join([f, ] left, right; how, <options>)\n\nJoin two tables (left and right). how specifies which join method is used (one of :inner, :left, :right, :outer and :anti). By default, join keys are implied to be the primary keys, but this can be changed using the lkey and rkey options. See Options section below.\n\nThe function f must take 2 arguments: tuples of non-key fields from both tables as input. The fields chosen for f can be configured using lselect and rselect options. See Options section below. If f is not specified, then these tuples are concatenated to form the non-indexed fields of the output.\n\nInner join\n\nInner join is the default join (when how is unspecified). It looks up keys from left in right and only joins them when there is a match. This generates the \"intersection\" of keys from left and right.\n\njulia> l = table([1,1,2,2], [1,2,1,2], [1,2,3,4],\n                 names=[:a,:b,:c], pkey=(:a, :b))\nTable with 4 rows, 3 columns:\na  b  c\n───────\n1  1  1\n1  2  2\n2  1  3\n2  2  4\n\njulia> r = table([0,1,1,3], [1,1,2,2], [1,2,3,4],\n                 names=[:a,:b,:d], pkey=(:a, :b))\nTable with 4 rows, 3 columns:\na  b  d\n───────\n0  1  1\n1  1  2\n1  2  3\n3  2  4\n\njulia> join(l,r) # inner join\nTable with 2 rows, 4 columns:\na  b  c  d\n──────────\n1  1  1  2\n1  2  2  3\n\nLeft join\n\nLeft join looks up rows from right where keys match that in left. If there are no such rows in right, an NA value is used for every selected field from right.\n\njulia> join(l,r, how=:left)\nTable with 4 rows, 4 columns:\na  b  c  d\n────────────\n1  1  1  2\n1  2  2  3\n2  1  3  #NA\n2  2  4  #NA\n\nOuter join\n\nOuter (aka Union) join looks up rows from right where keys match that in left, and also rows from left where keys match those in left, if there are no matches on either side, a tuple of NA values is used. The output is guarranteed to contain the union of all keys from both tables.\n\njulia> join(l,r, how=:outer)\nTable with 6 rows, 4 columns:\na  b  c    d\n──────────────\n0  1  #NA  1\n1  1  1    2\n1  2  2    3\n2  1  3    #NA\n2  2  4    #NA\n3  2  #NA  4\n\nAnti join\n\nAnti join keeps rows in left whose keys are NOT present in right.\n\njulia> join(l, r, how=:anti)\nTable with 2 rows, 3 columns:\na  b  c\n───────\n2  1  3\n2  2  4\n\nOne-to-many and many-to-many matches\n\nIf the same key appears multiple times in either table (say, m and n times respectively), each row with a key from left is matched with each row from right with that key (resulting in m×n output rows with the same key.)\n\njulia> l1 = table([1,2,2,3], [1,2,3,4], names=[:x,:y])\nTable with 4 rows, 2 columns:\nx  y\n────\n1  1\n2  2\n2  3\n3  4\n\njulia> r1 = table([2,2,3,3], [5,6,7,8], names=[:x,:z])\nTable with 4 rows, 2 columns:\nx  z\n────\n2  5\n2  6\n3  7\n3  8\n\njulia> join(l1,r1, lkey=:x, rkey=:x)\nTable with 6 rows, 3 columns:\nx  y  z\n───────\n2  2  5\n2  2  6\n2  3  5\n2  3  6\n3  4  7\n3  4  8\n\nThis applies to all joins described above except anti join where rows are not matched.\n\nOptions\n\nhow::Symbol – join method to use. Described above.\nlkey::Selection – fields from left to match on\nrkey::Selection – fields from right to match on\nlselect::Selection – fields from left to use as output columns, or input to f if it is specified. By default, this is all fields not selected in lkey.\nrselect::Selection – fields from right to use as output columns, or input to f if it is specified. By default, this is all fields not selected in rkey.\n\nSee select for a description of Selection type.\n\njulia> join(l, r, lkey=:a, rkey=:a,\n            lselect=:b, rselect=:d, how=:outer)\nTable with 8 rows, 3 columns:\na  b    d\n───────────\n0  #NA  1\n1  1    2\n1  1    3\n1  2    2\n1  2    3\n2  1    #NA\n2  2    #NA\n3  #NA  4\n\n\n\n"
},

{
    "location": "api/joins.html#IndexedTables.groupjoin",
    "page": "Joins",
    "title": "IndexedTables.groupjoin",
    "category": "Function",
    "text": "groupjoin([f, ] left, right; how, <options>)\n\nJoin left and right creating groups of values with matching keys.\n\nInner join\n\nInner join is the default join (when how is unspecified). It looks up keys from left in right and only joins them when there is a match. This generates the \"intersection\" of keys from left and right.\n\nOne-to-many and many-to-many matches\n\nIf the same key appears multiple times in either table (say, m and n times respectively), each row with a key from left is matched with each row from right with that key. The resulting group has m×n output elements.\n\njulia> l = table([1,1,1,2], [1,2,2,1], [1,2,3,4],\n                 names=[:a,:b,:c], pkey=(:a, :b))\nTable with 4 rows, 3 columns:\na  b  c\n───────\n1  1  1\n1  2  2\n1  2  3\n2  1  4\n\njulia> r = table([0,1,1,2], [1,2,2,1], [1,2,3,4],\n                 names=[:a,:b,:d], pkey=(:a, :b))\nTable with 4 rows, 3 columns:\na  b  d\n───────\n0  1  1\n1  2  2\n1  2  3\n2  1  4\n\njulia> groupjoin(l,r)\nTable with 2 rows, 3 columns:\na  b  groups\n──────────────────────────────────────────────────────────────────────────────────────────────────────\n1  2  NamedTuples._NT_c_d{Int64,Int64}[(c = 2, d = 2), (c = 2, d = 3), (c = 3, d = 2), (c = 3, d = 3)]\n2  1  NamedTuples._NT_c_d{Int64,Int64}[(c = 4, d = 4)]\n\nLeft join\n\nLeft join looks up rows from right where keys match that in left. If there are no such rows in right, an NA value is used for every selected field from right.\n\njulia> groupjoin(l,r, how=:left)\nTable with 3 rows, 3 columns:\na  b  groups\n──────────────────────────────────────────────────────────────────────────────────────────────────────\n1  1  NamedTuples._NT_c_d{Int64,Int64}[]\n1  2  NamedTuples._NT_c_d{Int64,Int64}[(c = 2, d = 2), (c = 2, d = 3), (c = 3, d = 2), (c = 3, d = 3)]\n2  1  NamedTuples._NT_c_d{Int64,Int64}[(c = 4, d = 4)]\n\nOuter join\n\nOuter (aka Union) join looks up rows from right where keys match that in left, and also rows from left where keys match those in left, if there are no matches on either side, a tuple of NA values is used. The output is guarranteed to contain \n\n\njulia> groupjoin(l,r, how=:outer)\nTable with 4 rows, 3 columns:\na  b  groups\n──────────────────────────────────────────────────────────────────────────────────────────────────────\n0  1  NamedTuples._NT_c_d{Int64,Int64}[]\n1  1  NamedTuples._NT_c_d{Int64,Int64}[]\n1  2  NamedTuples._NT_c_d{Int64,Int64}[(c = 2, d = 2), (c = 2, d = 3), (c = 3, d = 2), (c = 3, d = 3)]\n2  1  NamedTuples._NT_c_d{Int64,Int64}[(c = 4, d = 4)]\n\nOptions\n\nhow::Symbol – join method to use. Described above.\nlkey::Selection – fields from left to match on\nrkey::Selection – fields from right to match on\nlselect::Selection – fields from left to use as input to use as output columns, or input to f if it is specified. By default, this is all fields not selected in lkey.\nrselect::Selection – fields from left to use as input to use as output columns, or input to f if it is specified. By default, this is all fields not selected in rkey.\n\njulia> groupjoin(l,r, lkey=:a, rkey=:a, lselect=:c, rselect=:d, how=:outer)\nTable with 3 rows, 2 columns:\na  groups\n───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────\n0  NamedTuples._NT_c_d{Int64,Int64}[]\n1  NamedTuples._NT_c_d{Int64,Int64}[(c = 1, d = 2), (c = 1, d = 3), (c = 2, d = 2), (c = 2, d = 3), (c = 3, d = 2), (c = 3, d = 3)]\n2  NamedTuples._NT_c_d{Int64,Int64}[(c = 4, d = 4)]\n\n\n\n"
},

{
    "location": "api/joins.html#IndexedTables.asofjoin",
    "page": "Joins",
    "title": "IndexedTables.asofjoin",
    "category": "Function",
    "text": "asofjoin(left::NDSparse, right::NDSparse)\n\nasofjoin is most useful on two time-series. It joins rows from left with the \"most recent\" value from right.\n\njulia> x = ndsparse(([\"ko\",\"ko\", \"xrx\",\"xrx\"],\n                     Date.([\"2017-11-11\", \"2017-11-12\",\n                            \"2017-11-11\", \"2017-11-12\"])), [1,2,3,4]);\n\njulia> y = ndsparse(([\"ko\",\"ko\", \"xrx\",\"xrx\"],\n                     Date.([\"2017-11-12\", \"2017-11-13\",\n                            \"2017-11-10\", \"2017-11-13\"])), [5,6,7,8])\n\njulia> asofjoin(x,y)\n2-d NDSparse with 4 values (Int64):\n1      2          │\n──────────────────┼──\n\"ko\"   2017-11-11 │ 1\n\"ko\"   2017-11-12 │ 5\n\"xrx\"  2017-11-11 │ 7\n\"xrx\"  2017-11-12 │ 7\n\n\n\n"
},

{
    "location": "api/joins.html#Joins-1",
    "page": "Joins",
    "title": "Joins",
    "category": "section",
    "text": "joingroupjoinasofjoin"
},

{
    "location": "api/joins.html#Base.merge",
    "page": "Joins",
    "title": "Base.merge",
    "category": "Function",
    "text": "Merge two NamedTuples favoring the lhs Order is preserved lhs names come first. This copies the underlying data.\n\n\n\nmerge(a::Union{Table, NDSparse}, a::Union{Table, NDSparse})\n\nMerge rows from two datasets while keeping them ordered by primary keys.\n\nExamples:\n\njulia> a = table([1,3,5], [1,2,3], names=[:x,:y], pkey=:x)\nTable with 3 rows, 2 columns:\nx  y\n────\n1  1\n3  2\n5  3\n\njulia> b = table([2,3,4], [1,2,3], names=[:x,:y], pkey=:x)\nTable with 3 rows, 2 columns:\nx  y\n────\n2  1\n3  2\n4  3\n\njulia> merge(a,b)\nTable with 6 rows, 2 columns:\nx  y\n────\n1  1\n2  1\n3  2\n3  2\n4  3\n5  3\n\n\nWhen merging two NDSparse objects, if the same key is present in both inputs, the value from the second input is chosen.\n\njulia> a = ndsparse([1,3,5], [1,2,3]);\n\njulia> b = ndsparse([2,3,4], [1,2,3]);\n\njulia> merge(a,b)\n1-d NDSparse with 5 values (Int64):\n1 │\n──┼──\n1 │ 1\n2 │ 1\n3 │ 2\n4 │ 3\n5 │ 3\n\n\nHowever, you can pass the agg keyword argument to combine the values with a custom function.\n\njulia> merge(a,b,agg=+)\n1-d NDSparse with 5 values (Int64):\n1 │\n──┼──\n1 │ 1\n2 │ 1\n3 │ 4\n4 │ 3\n5 │ 3\n\n\n\n"
},

{
    "location": "api/joins.html#Merge-1",
    "page": "Joins",
    "title": "Merge",
    "category": "section",
    "text": "merge"
},

{
    "location": "api/joins.html#Base.broadcast-Tuple{Function,IndexedTables.NDSparse,IndexedTables.NDSparse}",
    "page": "Joins",
    "title": "Base.broadcast",
    "category": "Method",
    "text": "broadcast(f::Function, A::NDSparse, B::NDSparse; dimmap::Tuple{Vararg{Int}})\n\nCompute an inner join of A and B using function f, where the dimensions of B are a subset of the dimensions of A. Values from B are repeated over the extra dimensions.\n\ndimmap optionally specifies how dimensions of A correspond to dimensions of B. It is a tuple where dimmap[i]==j means the ith dimension of A matches the jth dimension of B. Extra dimensions that do not match any dimensions of j should have dimmap[i]==0.\n\nIf dimmap is not specified, it is determined automatically using index column names and types.\n\njulia> a = ndsparse(([1,1,2,2], [1,2,1,2]), [1,2,3,4])\n2-d NDSparse with 4 values (Int64):\n1  2 │\n─────┼──\n1  1 │ 1\n1  2 │ 2\n2  1 │ 3\n2  2 │ 4\n\njulia> b = ndsparse([1,2], [1/1, 1/2])\n1-d NDSparse with 2 values (Float64):\n1 │\n──┼────\n1 │ 1.0\n2 │ 0.5\n\njulia> broadcast(*, a, b)\n2-d NDSparse with 4 values (Float64):\n1  2 │\n─────┼────\n1  1 │ 1.0\n1  2 │ 2.0\n2  1 │ 1.5\n2  2 │ 2.0\n\nThe .-broadcast syntax works with NDSparse:\n\njulia> a.*b\n2-d NDSparse with 4 values (Float64):\n1  2 │\n─────┼────\n1  1 │ 1.0\n1  2 │ 2.0\n2  1 │ 1.5\n2  2 │ 2.0\n\ndimmap maps dimensions that should be broadcasted:\n\n\njulia> broadcast(*, a, b, dimmap=(0,1))\n2-d NDSparse with 4 values (Float64):\n1  2 │\n─────┼────\n1  1 │ 1.0\n1  2 │ 1.0\n2  1 │ 3.0\n2  2 │ 2.0\n\n\n\n\n"
},

{
    "location": "api/joins.html#Broadcast-1",
    "page": "Joins",
    "title": "Broadcast",
    "category": "section",
    "text": "broadcast(f::Function, A::NDSparse, B::NDSparse)"
},

{
    "location": "api/io.html#",
    "page": "Loading and Saving",
    "title": "Loading and Saving",
    "category": "page",
    "text": "CurrentModule = JuliaDB\nDocTestSetup = quote\n    using JuliaDB\nend"
},

{
    "location": "api/io.html#Loading-and-Saving-datasets-1",
    "page": "Loading and Saving",
    "title": "Loading and Saving datasets",
    "category": "section",
    "text": ""
},

{
    "location": "api/io.html#JuliaDB.loadtable",
    "page": "Loading and Saving",
    "title": "JuliaDB.loadtable",
    "category": "Function",
    "text": "loadtable(files::Union{AbstractVector,String}; <options>)\n\nLoad a table from CSV files.\n\nfiles is either a vector of file paths, or a directory name.\n\nOptions:\n\noutput::AbstractString – directory name to write the table to. By default data is loaded directly to memory. Specifying this option will allow you to load data larger than the available memory.\nindexcols::Vector – columns to use as primary key columns. (defaults to [])\ndatacols::Vector – non-indexed columns. (defaults to all columns but indexed columns). Specify this to only load a subset of columns. In place of the name of a column, you can specify a tuple of names – this will treat any column with one of those names as the same column, but use the first name in the tuple. This is useful when the same column changes name between CSV files. (e.g. vendor_id and VendorId)\ndistributed::Bool – should the output dataset be loaded as a distributed table? If true, this will use all available worker processes to load the data. (defaults to true if workers are available, false if not)\nchunks::Int – number of chunks to create when loading distributed. (defaults to number of workers)\ndelim::Char – the delimiter character. (defaults to ,). Use spacedelim=true to split by spaces.\nspacedelim::Bool: parse space-delimited files. delim has no effect if true.\nquotechar::Char – quote character. (defaults to \")\nescapechar::Char – escape character. (defaults to \\)\nheader_exists::Bool – does header exist in the files? (defaults to true)\ncolnames::Vector{String} – specify column names for the files, use this with (header_exists=false, otherwise first row is discarded). By default column names are assumed to be present in the file.\nsamecols – a vector of tuples of strings where each tuple contains alternative names for the same column. For example, if some files have the name \"vendor_id\" and others have the name \"VendorID\", pass samecols=[(\"VendorID\", \"vendor_id\")].\ncolparsers – either a vector or dictionary of data types or an AbstractToken object from TextParse package. By default, these are inferred automatically. See type_detect_rows option below.\ntype_detect_rows: number of rows to use to infer the initial colparsers defaults to 20.\nnastrings::Vector{String} – strings that are to be considered NA. (defaults to TextParse.NA_STRINGS)\nskiplines_begin::Char – skip some lines in the beginning of each file. (doesn\'t skip by default)\nusecache::Bool: (vestigial)\n\n\n\n"
},

{
    "location": "api/io.html#JuliaDB.loadndsparse",
    "page": "Loading and Saving",
    "title": "JuliaDB.loadndsparse",
    "category": "Function",
    "text": "loadndsparse(files::Union{AbstractVector,String}; <options>)\n\nLoad an NDSparse from CSV files.\n\nfiles is either a vector of file paths, or a directory name.\n\nOptions:\n\nindexcols::Vector – columns to use as indexed columns. (by default a 1:n implicit index is used.)\ndatacols::Vector – non-indexed columns. (defaults to all columns but indexed columns). Specify this to only load a subset of columns. In place of the name of a column, you can specify a tuple of names – this will treat any column with one of those names as the same column, but use the first name in the tuple. This is useful when the same column changes name between CSV files. (e.g. vendor_id and VendorId)\n\nAll other options are identical to those in loadtable\n\n\n\n"
},

{
    "location": "api/io.html#Load-from-CSV-1",
    "page": "Loading and Saving",
    "title": "Load from CSV",
    "category": "section",
    "text": "loadtableloadndsparse"
},

{
    "location": "api/io.html#Dagger.save",
    "page": "Loading and Saving",
    "title": "Dagger.save",
    "category": "Function",
    "text": "save(t::Union{DNDSparse, DTable}, outputdir::AbstractString)\n\nSaves a distributed dataset to disk. Saved data can be loaded with load.\n\n\n\n"
},

{
    "location": "api/io.html#Dagger.load",
    "page": "Loading and Saving",
    "title": "Dagger.load",
    "category": "Function",
    "text": "load(dir::AbstractString; tomemory)\n\nLoad a saved DNDSparse from dir directory. Data can be saved using the save function.\n\n\n\n"
},

{
    "location": "api/io.html#Save-and-Load-blobs-1",
    "page": "Loading and Saving",
    "title": "Save and Load blobs",
    "category": "section",
    "text": "saveload"
},

{
    "location": "api/plotting.html#",
    "page": "Plotting",
    "title": "Plotting",
    "category": "page",
    "text": ""
},

{
    "location": "api/plotting.html#Plotting-1",
    "page": "Plotting",
    "title": "Plotting",
    "category": "section",
    "text": "Pkg.add(\"StatPlots\")\nPkg.add(\"GR\")\nusing StatPlots\nENV[\"GKSwstype\"] = \"100\"\ngr()\nsrand(1234)  # set random seed to get consistent plots"
},

{
    "location": "api/plotting.html#StatPlots-1",
    "page": "Plotting",
    "title": "StatPlots",
    "category": "section",
    "text": "JuliaDB has all access to all the power and flexibility of Plots via StatPlots and the @df macro.using JuliaDB, StatPlots\n\nt = table(@NT(x = randn(100), y = randn(100)))\n\n@df t scatter(:x, :y)\nsavefig(\"statplot.png\"); nothing # hide(Image: )"
},

{
    "location": "api/plotting.html#JuliaDB.partitionplot",
    "page": "Plotting",
    "title": "JuliaDB.partitionplot",
    "category": "Function",
    "text": "partitionplot(table, y;    stat=Extrema(), nparts=100, by=nothing, dropmissing=false)\npartitionplot(table, x, y; stat=Extrema(), nparts=100, by=nothing, dropmissing=false)\n\nPlot a summary of variable y against x (1:length(y) if not specified).  Using nparts approximately-equal sections along the x-axis, the data in y over each section is  summarized by stat. \n\n\n\n"
},

{
    "location": "api/plotting.html#partitionplot-1",
    "page": "Plotting",
    "title": "partitionplot",
    "category": "section",
    "text": "partitionplot"
},

{
    "location": "api/plotting.html#Examples-1",
    "page": "Plotting",
    "title": "Examples",
    "category": "section",
    "text": "using JuliaDB, Plots, OnlineStats\n\nx = randn(10^6)\ny = x + randn(10^6)\nz = x .> 0\nt = table(@NT(x=x, y=y, z=z))\n\n# x by itself\npartitionplot(t, :x, stat = Extrema())\nsavefig(\"plot1.png\"); nothing # hide(Image: )# y by x\npartitionplot(t, :x, :y, stat = Hist(25))\nsavefig(\"plot2.png\"); nothing # hide(Image: )# y by x, grouped by z\npartitionplot(t, :x, :y, stat = Extrema(), by = z)\nsavefig(\"plot3.png\"); nothing # hide(Image: )"
},

{
    "location": "manual/onlinestats.html#",
    "page": "OnlineStats Integration",
    "title": "OnlineStats Integration",
    "category": "page",
    "text": ""
},

{
    "location": "manual/onlinestats.html#OnlineStats-Integration-1",
    "page": "OnlineStats Integration",
    "title": "OnlineStats Integration",
    "category": "section",
    "text": "OnlineStats is a package for calculating  statistics and models with online (one observation at a time) parallelizable algorithms.   This integrates tightly with JuliaDB\'s distributed data structures to calculate statistics on large datasets.For the full OnlineStats documentation, see http://joshday.github.io/OnlineStats.jl/stable/."
},

{
    "location": "manual/onlinestats.html#Basics-1",
    "page": "OnlineStats Integration",
    "title": "Basics",
    "category": "section",
    "text": "Each statistic/model is a subtype of OnlineStat.  OnlineStats are grouped together in  a Series.  In JuliaDB, the functions reduce and groupreduce can accept:An OnlineStat\nA tuple of OnlineStats\nA Series"
},

{
    "location": "manual/onlinestats.html#Example-Table-1",
    "page": "OnlineStats Integration",
    "title": "Example Table",
    "category": "section",
    "text": "using JuliaDB, OnlineStats\n\nt = table(@NT(x = randn(100), y = randn(100), z = rand(1:5, 100)))"
},

{
    "location": "manual/onlinestats.html#Usage-on-a-single-column-1",
    "page": "OnlineStats Integration",
    "title": "Usage on a single column",
    "category": "section",
    "text": ""
},

{
    "location": "manual/onlinestats.html#reduce-via-OnlineStat-1",
    "page": "OnlineStats Integration",
    "title": "reduce via OnlineStat",
    "category": "section",
    "text": "reduce(Mean(), t; select = :x)"
},

{
    "location": "manual/onlinestats.html#reduce-via-Tuple-of-OnlineStats-1",
    "page": "OnlineStats Integration",
    "title": "reduce via Tuple of OnlineStats",
    "category": "section",
    "text": "reduce((Mean(), Variance()), t; select = :x)"
},

{
    "location": "manual/onlinestats.html#reduce-via-Series-1",
    "page": "OnlineStats Integration",
    "title": "reduce via Series",
    "category": "section",
    "text": "s = Series(Mean(), Variance(), Sum());\nreduce(s, t; select = :x)"
},

{
    "location": "manual/onlinestats.html#Usage-on-multiple-columns-1",
    "page": "OnlineStats Integration",
    "title": "Usage on multiple columns",
    "category": "section",
    "text": ""
},

{
    "location": "manual/onlinestats.html#Same-OnlineStat-on-each-column-1",
    "page": "OnlineStats Integration",
    "title": "Same OnlineStat on each column",
    "category": "section",
    "text": "If we want the same statistic calculated for each column in the selection, we need to specify the number of columns. reduce(2Mean(), t; select = (:x, :y))"
},

{
    "location": "manual/onlinestats.html#Different-OnlineStats-on-columns-1",
    "page": "OnlineStats Integration",
    "title": "Different OnlineStats on columns",
    "category": "section",
    "text": "To calculate different statistics on different columns, we need to make a Group, which can be created via hcat.s = reduce([Mean() CountMap(Int)], t; select = (:x, :z))\n\nvalue(stats(s)[1])"
},

{
    "location": "manual/out-of-core.html#",
    "page": "Out-of-core functionality",
    "title": "Out-of-core functionality",
    "category": "page",
    "text": ""
},

{
    "location": "manual/out-of-core.html#Out-of-core-processing-1",
    "page": "Out-of-core functionality",
    "title": "Out-of-core processing",
    "category": "section",
    "text": "JuliaDB can be used to load and work with data that are too big to fit in memory (RAM). Several queries are designed to work on such datasets."
},

{
    "location": "manual/out-of-core.html#Processing-scheme-1",
    "page": "Out-of-core functionality",
    "title": "Processing scheme",
    "category": "section",
    "text": "The basic scheme of out-of-core processing is this:Data is loaded into a distributed dataset containing \"chunks\" that are of small enough to fit in memory\nData is processed p chunks at a time – where p is the number of worker processes. This means p * size of chunks should fit in memory!\nOutput data is accumulated in-memory and must be small enough to fit in the available memory.Further, data is memory-mapped from disk so as to minimize IO overhead.Note that this processing scheme means that not all operations in JuliaDB work out-of-core. There are several operations that do work right now as described in the rest of the document. We are working to make the coverage of out-of-core operations more comprehensive."
},

{
    "location": "manual/out-of-core.html#Loading-data-out-of-core-1",
    "page": "Out-of-core functionality",
    "title": "Loading data out-of-core",
    "category": "section",
    "text": "loadtable and loadndsparse functions take an output keyword argument which can be set to a directory where the loaded data is written to in an efficient binary format. It\'s also necessary to specify the chunks option to these functions which specify how many output chunks are to be generated from the input files.An example invocation may look like:loadtable(glob(\"*.csv\"), output=\"bin\", chunks=100; kwargs...)If there are, say, 1000 .csv files in the current directory, they will be read into 100 chunks (10 CSV files will be read to create a single chunk). Once a batch of 10 CSV files is read, the data is written to a single binary file in the bin directory. Now let\'s say you have 10 worker processes. Each process will load chunks of 10 files each, meaning the data in up to 100 files may be loaded to memory before being written to disk.Once loadtable has completed, you can load the ingested data using load:tbl = load(\"bin\")tbl is now a distributed table made of chunks which are on disk."
},

{
    "location": "manual/out-of-core.html#reduce-operations-1",
    "page": "Out-of-core functionality",
    "title": "reduce operations",
    "category": "section",
    "text": "reduce is the most trivial out-of-core operation since it works pair-wise requiring a small, fixed amount of memory. For example, you can sum up the foo column using reduce(+, tbl, select=:foo).The OnlineStats.jl package (which is shipped with JuliaDB) allows aggregating and merging statistics on data using a small fixed amount of memory as well. For example, you can find the mean of the foo column with this code:using OnlineStats\nreduce(Mean(), tbl, select=:foo)Check out other handy OnlineStats. OnlineStats.jl also allows you to extract histograms or partitioned stats (i.e. stats on a fixed window of data, hence reducing the output size)"
},

{
    "location": "manual/out-of-core.html#groupreduce-operations-1",
    "page": "Out-of-core functionality",
    "title": "groupreduce operations",
    "category": "section",
    "text": "groupreduce performs _grouped_ reduction. As long as the number of unique groups in the selected grouping key are small enough, groupreduce works out-of-core. groupreduce can be performed with pair-wise functions or OnlineStats, as with reduce. For example, to find the mean of foo field for every unique bar and baz pairs, you can do:using OnlineStats\ngroupreduce(Mean(), tbl, (:bar, :baz), select=:foo)Note that groupby operations may involve an expensive data shuffling step as it requires data belonging to the same group to be on the same processor, and hence isn\'t generally out-of-core."
},

{
    "location": "manual/out-of-core.html#broadcast-join-operations-1",
    "page": "Out-of-core functionality",
    "title": "broadcast join operations",
    "category": "section",
    "text": "join operations have limited out-of-core support. Specifically,join(bigtable, smalltable, broadcast=:right, how=:inner|:left|:anti)Here bigtable can be larger than memory, while p copies of smalltable must fit in memory (where p is number of workers). Note that only :inner, :left, and :anti joins are supported. Notably missing is :outer join. In this operation the small table is first broadcast to all processors, and the big table is joined p chunks at a time. Hence the name \"broadcast join\"."
},

{
    "location": "manual/ml.html#",
    "page": "Feature Extraction",
    "title": "Feature Extraction",
    "category": "page",
    "text": "CurrentModule = JuliaDB\nDocTestSetup = quote\n    using JuliaDB\n    import JuliaDB: ML\nend"
},

{
    "location": "manual/ml.html#Feature-Extraction-1",
    "page": "Feature Extraction",
    "title": "Feature Extraction",
    "category": "section",
    "text": "Machine learning models are composed of mathematical operations on matrices of numbers. However, data in the real world is often in tabular form containing more than just numbers. Hence, the first step in applying machine learning is to turn such tabular non-numeric data into a matrix of numbers. Such matrices are called \"feature matrices\". JuliaDB contains an ML module which has helper functions to extract feature matrices.In this document, we will turn the titanic dataset from Kaggle into numeric form and apply a machine learning model on it.using JuliaDB\n\ndownload(\"https://raw.githubusercontent.com/agconti/\"*\n          \"kaggle-titanic/master/data/train.csv\", \"train.csv\")\n\ntrain_table = loadtable(\"train.csv\", escapechar=\'\"\')\npopcol(popcol(popcol(train_table, :Name), :Ticket), :Cabin) # hide"
},

{
    "location": "manual/ml.html#ML.schema-1",
    "page": "Feature Extraction",
    "title": "ML.schema",
    "category": "section",
    "text": "Schema is a programmatic description of the data in each column. It is a dictionary which maps each column (by name) to its schema type (mainly Continuous, and Categorical).ML.Continuous: data is drawn from the real number line (e.g. Age)\nML.Categorical: data is drawn from a fixed set of values (e.g. Sex)ML.schema(train_table) will go through the data and infer the types and distribution of data. Let\'s try it without any arguments on the titanic dataset:ML.schema(train_table)Here is how the schema was inferred:Numeric fields were inferred to be Continuous, their mean and standard deviations were computed. This will later be used in normalizing the column in the feature matrix using the formula ((value - mean) / standard_deviation). This will bring all columns to the same \"scale\" making the training more effective.\nSome string columns are inferred to be Categorical (e.g. Sex, Embarked) - this means that the column is a PooledArray, and is drawn from a small \"pool\" of values. For example Sex is either \"male\" or \"female\"; Embarked is one of \"Q\", \"S\", \"C\" or \"\"\nSome string columns (e.g. Name) get the schema nothing – such columns usually contain unique identifying data, so are not useful in machine learning.\nThe age column was inferred as Maybe{Continuous} – this means that there are missing values in the column. The mean and standard deviation computed are for the non-missing values.You may note that Survived column contains only 1s and 0s to denote whether a passenger survived the disaster or not. However, our schema inferred the column to be Continuous. To not be overly presumptive ML.schema will assume all numeric columns are continuous by default. We can give the hint that the Survived column is categorical by passing the hints arguemnt as a dictionary of column name to schema type. Further, we will also treat Pclass (passenger class) as categorical and suppress Parch and SibSp fields.sch = ML.schema(train_table, hints=Dict(\n        :Pclass => ML.Categorical,\n        :Survived => ML.Categorical,\n        :Parch => nothing,\n        :SibSp => nothing,\n        :Fare => nothing,\n        )\n)"
},

{
    "location": "manual/ml.html#Split-schema-into-input-and-output-1",
    "page": "Feature Extraction",
    "title": "Split schema into input and output",
    "category": "section",
    "text": "In a machine learning model, a subset of fields act as the input to the model, and one or more fields act as the output (predicted variables). For example, in the titanic dataset, you may want to predict whether a person will survive or not. So \"Survived\" field will be the output column. Using the ML.splitschema function, you can split the schema into input and output schema.input_sch, output_sch = ML.splitschema(sch, :Survived)"
},

{
    "location": "manual/ml.html#Extracting-feature-matrix-1",
    "page": "Feature Extraction",
    "title": "Extracting feature matrix",
    "category": "section",
    "text": "Once the schema has been created, you can extract the feature matrix according to the given schema using ML.featuremat:train_input = ML.featuremat(input_sch, train_table)train_output = ML.featuremat(output_sch, train_table)"
},

{
    "location": "manual/ml.html#Learning-1",
    "page": "Feature Extraction",
    "title": "Learning",
    "category": "section",
    "text": "Let us create a simple neural network to learn whether a passenger will survive or not using the Flux framework.ML.width(schema) will give the number of features in the schema we will use this in specifying the model size:using Flux\n\nmodel = Chain(\n  Dense(ML.width(input_sch), 32, relu),\n  Dense(32, ML.width(output_sch)),\n  softmax)\n\nloss(x, y) = Flux.mse(model(x), y)\nopt = Flux.ADAM(Flux.params(model))\nevalcb = Flux.throttle(() -> @show(loss(first(data)...)), 2);Train the data in 10 iterationsdata = [(train_input, train_output)]\nfor i = 1:10\n  Flux.train!(loss, data, opt, cb = evalcb)\nenddata given to the model is a vector of batches of input-output matrices. In this case we are training with just 1 batch."
},

{
    "location": "manual/ml.html#Prediction-1",
    "page": "Feature Extraction",
    "title": "Prediction",
    "category": "section",
    "text": "Now let\'s load some testing data to use the model we learned to predict survival.\ndownload(\"https://raw.githubusercontent.com/agconti/\"*\n          \"kaggle-titanic/master/data/test.csv\", \"test.csv\")\n\ntest_table = loadtable(\"test.csv\", escapechar=\'\"\')\n\ntest_input = ML.featuremat(input_sch, test_table) ;Run the model on one observation:model(test_input[:, 1])The output has two numbers which add up to 1: the probability of not surviving vs that of surviving. It seems, according to our model, that this person is unlikely to survive on the titanic.You can also run the model on all observations by simply passing the whole feature matrix to model.model(test_input)"
},

]}
