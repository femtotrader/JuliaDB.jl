var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "index.html#Overview-1",
    "page": "Introduction",
    "title": "Overview",
    "category": "section",
    "text": "JuliaDB is a package for working with large persistent data sets.We recognized the need for an all-Julia, end-to-end tool that canLoad multi-dimensional datasets quickly and incrementally.\nIndex the data and perform filter, aggregate, sort and join operations.\nSave results and load them efficiently later.\nReadily use Julia's built-in parallelism to fully utilize any machine or cluster.We built JuliaDB to fill this void.JuliaDB is Julia all the way down. This means queries can be composed with Julia code that may use a vast ecosystem of packages.JuliaDB is based on Dagger and IndexedTables. It provides a distributed-array-like data model where the indexed data comprises the dimensions of the array. Over time, we hope to extend the data model to allow represent dense arrays and other Julia array types like AxisArrays. On top of this distributed-array-like model, JuliaDB also provides all the familiar relational database operations that are optimized to use the index."
},

{
    "location": "index.html#Getting-started-1",
    "page": "Introduction",
    "title": "Getting started",
    "category": "section",
    "text": "JuliaDB works on Julia 0.6 or higher. To install it, run:Pkg.clone(\"https://github.com/JuliaComputing/JuliaDB.jl.git\")To use JuliaDB, you may start Julia with a few worker processes (julia -p N) or, alternatively, run addprocs(N) before runningusing JuliaDBMultiple processes may not be benificial for datasets with less than a few tens of millions of rows. Communication costs are eliminated on a single process, but of course you will be using a single CPU."
},

{
    "location": "index.html#Loading-and-saving-data-1",
    "page": "Introduction",
    "title": "Loading and saving data",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Loading-CSV-files-1",
    "page": "Introduction",
    "title": "Loading CSV files",
    "category": "section",
    "text": "Given a set of CSV files, JuliaDB builds and saves an index that allows the data to be accessed efficiently in the future. The \"ingest\" operation converts data to an efficient memory-mappable binary format.Let's load some data from JuliaDB's test directory. The sample data contains monthly aggregates of stock prices (open, high, low, close values) as well as volume traded for 4 stocks (GOOGL, GS, KO, XRX) in the years 2010 through 2015. Each file contains a single year's data.path = Pkg.dir(\"JuliaDB\", \"test\", \"sample\")\n\nsampledata = loadfiles(path, indexcols=[\"date\", \"ticker\"])loadfiles loads all files under a given directory. If you started julia with many processes, loadfiles will enlist the available workers to read the files in parallel. If you wanted to specify a subset of files to load or files in different directories, you can pass the file names as a vector in place of the directory path. JuliaDB exports the glob function from Glob.jl to help you with this.Using the indexcols option, here we specified that loadfiles should use date and ticker columns as the index for the data. See the API reference for loadfiles for all available options.Notice that the output says DTable with 288 rows in 6 chunks. loadfiles creates a distributed table (DTable) with as many chunks as the input files. The loaded chunks are distributed across available worker processes. Below this line are the first 5 rows of the table giving a peek of what's in it, the data is sorted by the index columns which are to the left of the vertical line cutting through the table.loadfiles will also save metadata about the contents of the files in a directory named .juliadb in the directory with the files (or in the current working directory if a vector of filenames is passed). This means, the next time the files are loaded, it will not need to actually parse them to know what's in them. However a file will be parsed once an operation requires the data in it.Another way to load data into JuliaDB is using ingest. ingest reads and saves the data in an efficient memory-mappable binary storage format for fast reloading. You can also add new files to an existing dataset using ingest!."
},

{
    "location": "index.html#Saving-and-loading-JuliaDB-tables-1",
    "page": "Introduction",
    "title": "Saving and loading JuliaDB tables",
    "category": "section",
    "text": "You can save a DTable to disk at any point:save(t, \"<outputdir>\")This will create <outputdir> and save the individual chunks of the data in its own file.A saved dataset can be loaded with load:data = load(\"<outpudir>\")"
},

{
    "location": "index.html#Filtering-1",
    "page": "Introduction",
    "title": "Filtering",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#Indexing-1",
    "page": "Introduction",
    "title": "Indexing",
    "category": "section",
    "text": "Most lookup and filtering operations on DTable can be done via indexing _into_ it. Our sampledata object behaves like a 2-d array, accepting two indices, each a value, a range or a vector of values from the corresponding index columns.You can get a specific value by indexing it by the exact index:sampledata[Date(\"2010-06-01\"), \"GOOGL\"] # Get GOOGL's data for June 2010Above, we are indexing the table with a specific index value (2010-06-01, \"GOOGL\"). Here our DTable behaved like a dictionary, giving the value stored at a given key. The result is a NamedTuple object containing 5 fields which of the same names as the data columns.info: Info\nThe result of indexing into a table can bea NamedTuple - if the data columns are named\na Tuple - if there are multiple columns but the columns are not named\na scalar value - if there is only one column (a vector) for the dataOne can also get a subset of the DTable by indexing into it with a range or a sorted vector of index values:sampledata[Date(\"2012-01\"):Dates.Month(1):Date(\"2014-12\"), [\"GOOG\", \"KO\"]]Fetches all values in the data for the stock symbols GOOG and KO in the years 2012 - 2014sampledata[:, [\"GOOG\", \"KO\"]]Fetches all values in the data for the stock symbols GOOG and KO.Range indexing always returns a DTable so that you can apply any other JuliaDB operation on the result of indexing.note: Note\nMinutiae: notice the range we have used in the last example: Date(\"2012-01\"):Dates.Month(1):Date(\"2014-12\"). This says \"from 2012-01-01 to 2014-12-01 in steps of 1 month\". Date/DateTime ranges in Julia need to be specified with an increment such as Dates.Month(1). If your dataset contains timestamps in the millisecond resolution, for example, you'd need to specify Dates.Millisecond(1) as the increment, and so on."
},

{
    "location": "index.html#select-1",
    "page": "Introduction",
    "title": "select",
    "category": "section",
    "text": "If you want to apply a custom predicate on index values to filter the data, you can do so with select by passing column=>predicate pairs:select(sampledata, :date=>Dates.ismonday)Filters only data points where the first of the month falls on a monday!You can also provide multiple predicates. Below we will get values only for months starting on a monday and for stock symbols starting with the letter \"G\".select(sampledata, 1=>Dates.ismonday, 2=>x->startswith(x, \"G\"))select is similar to a where clause in traditional SQL/relational databases."
},

{
    "location": "index.html#filter-1",
    "page": "Introduction",
    "title": "filter",
    "category": "section",
    "text": "filter lets you filter based on the data values as opposed to select which filters based on the index values.Here we filter only stock data where either the low value is greater than 10.filter(x->x.low > 10.0, sampledata)Notice the use of x.low in the predicate. This is because x is a NamedTuple having the same fields as the columns of the data. If the data columns are not labeled (say because header_exists was set to true in loadfiles and headers were not manually provided), then the x will be a tuple."
},

{
    "location": "index.html#Map-and-Reduce-1",
    "page": "Introduction",
    "title": "Map and Reduce",
    "category": "section",
    "text": "Good ol' map and reduce behave as you'd expect them to. map applies a function to every data point in the table. The input to map and reduce is of the same type as the output of scalar indexing on the table – it's either a NamedTuple, a Tuple or a scalar value (see note in the Indexing section).In this example, we will create a new table that contains the difference between the high and low value for each point in the table:diffs = map(x->x.high - x.low, sampledata)note: pick\nIt's often the case that you want to work with a single data vector. Extracting a single column can be acheived by using a simple map.volumes = map(x->x.volume, sampledata)However, this operation allocates a new data column and then populates it element-wise. This could be expensive. pick(:volume) acts as the function x->x.volume but is optimized to not copy the data. Hence the above is equivalent to the more efficient version:volumes = map(pick(:volume), sampledata)reduce takes a 2-argument function where the arguments are two data values and combines them until there's a single value left. Let's find the sum volume traded for all stocks in our data setreduce(+, map(x->x.volume, sampledata))Or equivalently,reduce(+, map(pick(:volume), sampledata))"
},

{
    "location": "index.html#Aggregation-1",
    "page": "Introduction",
    "title": "Aggregation",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#reducedim-and-select-1",
    "page": "Introduction",
    "title": "reducedim and select",
    "category": "section",
    "text": "One way to get a simplified summary of the data is by removing a dimension and then aggregating all remaining rows that have the same index values.This operation is called reducedim. Let's aggregate the open, high, low, close and volume values after removing the date dimension. This should aggregate all rows for each ticker symbol together.function agg_ohlcv(x, y) # hide\n    @NT( # hide\n        open = x.open, # first # hide\n        high = max(x.high, y.high), # hide\n        low = min(x.low, y.low), # hide\n        close = y.close, # last # hide\n        volume = x.volume + y.volume, # hide\n    ) # hide\nend # hide\n\n@everywhere function agg_ohlcv(x, y)\n    @NT(\n        open = x.open, # first\n        high = max(x.high, y.high),\n        low = min(x.low, y.low),\n        close = y.close, # last\n        volume = x.volume + y.volume,\n    )\nend\n\nreducedim(agg_ohlcv, sampledata, 1)info: Info\nA few things to note about the agg_ohlcv function:agg_ohlcv takes two data points as NamedTuples, and returns a NamedTuple (constructed using the @NT macro) with the exact same fields.\nopen value of the first input is kept, high is calculated as the maximum of high value of both inputs, low is the minimum of low values, close keeps the value from the second input, volume is the sum of volumes of the inputs.\nagg_ohlcv function is defined with @everywhere - this causes the function to be defined on all worker processes, which is required since the aggregation will be performed on all workers.Equivalently, the same operation can be done by only selecting the 2nd (ticker) dimension.select(sampledata, 2, agg=agg_ohlcv)If agg option is not specified, the result might have multiple values for some indices, and so does not fully behave like a normal array anymore.Operations that might leave the array in such a state accept the keyword argument agg, a function to use to combine all values associated with the same indices. If agg is not specified at first, one can aggregate such tables later using aggregate_vec.reducedim_vecSome aggregation functions are best written for a vector of data values rather than performed pairwise. For example, calculating the mean of high-low difference for each ticker symbol.function mean_diff(values) # hide\n    mean(map(x->x.high-x.low, values)) # hide\nend # hide\n\n@everywhere function mean_diff(values)\n    mean(map(x->x.high-x.low, values))\nend\n\nreducedim_vec(mean_diff, sampledata, 1)"
},

{
    "location": "index.html#Aggregation-by-converting-a-dimension-1",
    "page": "Introduction",
    "title": "Aggregation by converting a dimension",
    "category": "section",
    "text": "A location in the coordinate space of an array often has multiple possible descriptions.  This is especially common when describing data at different levels of detail.  For example, a point in time can be expressed at the level of seconds, minutes, or hours.In our test dataset, the dates in the date column each fall in the different quarters of the year. It is possible to aggregate the data for each quarter together for each ticker symbol using convertdim.convertdim accepts a DTable, a dimension number to convert, a function or dictionary to apply to indices in that dimension, and an aggregation function (the aggregation function is needed in case the mapping is many-to-one). You can optionally give a new name to the converted dimension using the name keyword argument.The following call therefore gives the quarterly aggregates for our data:convertdim(sampledata, 1, Dates.firstdayofquarter,\n                     agg=agg_ohlcv, name=:quarter)First every value in dimension 1 is converted using the function Dates.firstdayofquarter, i.e. to the first day of the quarter that date falls in. Next, the values in the table which correspond to the same indices (e.g. all values for the GOOG stock in 1st quarter of 2010) are aggregated together using agg."
},

{
    "location": "index.html#Permuting-dimensions-1",
    "page": "Introduction",
    "title": "Permuting dimensions",
    "category": "section",
    "text": "As with other multi-dimensional arrays, dimensions can be permuted to change the sort order of the data. In the context of our sample dataset, interchanging the dimensions would result in the data being sorted first by the stock symbol, and then within each stock symbol, it would be sorted by the date.permutedims(sampledata, [2, 1])In some cases, such dimension permutations are needed for performance. The leftmost column is esssentially the primary key –- indexing is fastest in this dimension on each worker, and scanning along it incurs the least cache misses.note: Note\nJuliaDB can perform a distributed sort to keep the resultant data still distributed. Note that this operations can be expensive to do every time you load a dataset (a billion rows take a few minutes to reshuffle), hence it's advisable to do it once and save the result in a separate output directory for re-reading later. (See saving and loading section below)."
},

{
    "location": "index.html#Joins-1",
    "page": "Introduction",
    "title": "Joins",
    "category": "section",
    "text": "JuliaDB provides several join operations to combine two or more DTables into one, namely naturaljoin, leftjoin, merge, and asofjoin."
},

{
    "location": "apireference.html#",
    "page": "API Reference",
    "title": "API Reference",
    "category": "page",
    "text": "CurrentModule = JuliaDB"
},

{
    "location": "apireference.html#API-documentation-1",
    "page": "API Reference",
    "title": "API documentation",
    "category": "section",
    "text": ""
},

{
    "location": "apireference.html#JuliaDB.DTable",
    "page": "API Reference",
    "title": "JuliaDB.DTable",
    "category": "Type",
    "text": "A distributed table. Can be constructed using loadfiles, ingest or distribute\n\n\n\n"
},

{
    "location": "apireference.html#DTable-1",
    "page": "API Reference",
    "title": "DTable",
    "category": "section",
    "text": "JuliaDB.DTable"
},

{
    "location": "apireference.html#JuliaDB.ingest",
    "page": "API Reference",
    "title": "JuliaDB.ingest",
    "category": "Function",
    "text": "ingest(files::Union{AbstractVector,String}, outputdir::AbstractString; <options>...)\n\ningests data from CSV files into JuliaDB. Stores the metadata and index in a directory outputdir. Creates outputdir if it doesn't exist.\n\nArguments:\n\ndelim::Char: the delimiter to use to read the text file with data. defaults to ,\nindexcols::AbstractArray: columns that are meant to act as the index for the table.  Defaults to all but the last column. If datacols is set, defaults to all  columns other than the data columns. If indexcols is an empty vector,  an implicit index of itegers 1:n is added to the data.\ndatacols::AbstractArray: columns that are meant to act as the data for the table.  Defaults to the last column. If indexcols is set, defaults to all  columns other than the index columns.\nagg::Function: aggregation function to use to combine data points with the same index. Defaults to nothing which leaves the data unaggregated (see aggregate to aggregate post-loading)).  table.)\npresorted::Bool: specifies if each CSV file is internally already sorted according  to the specified index column. This will avoid a re-sorting.\ntomemory::Bool: Load data to memory after ingesting instead of mmapping. Defaults to false.\nThe rest of the keyword arguments will be passed on to TextParse.csvread which is used by this function to load data from individual files.\n\nSee also loadfiles and save\n\n\n\n"
},

{
    "location": "apireference.html#JuliaDB.ingest!",
    "page": "API Reference",
    "title": "JuliaDB.ingest!",
    "category": "Function",
    "text": "ingest!(files::Union{AbstractVector,String}, outputdir::AbstractString; <options>...)\n\ningest data from files and append into data stored in outputdir. Creates outputdir if it doesn't exist. Arguments are the same as those to ingest. The index range of data in the new files should not overlap with files previously ingested.\n\nSee also ingest\n\n\n\n"
},

{
    "location": "apireference.html#JuliaDB.loadfiles",
    "page": "API Reference",
    "title": "JuliaDB.loadfiles",
    "category": "Function",
    "text": "loadfiles(files::Union{AbstractVector,String}, delim = ','; <options>)\n\nLoad a collection of CSV files into a DTable, where files is either a vector of file paths, or the path of a directory containing files to load.\n\nArguments:\n\nusecache::Bool: use cached metadata from previous loads while loading the files. Set this to false if you are changing other options.\n\nAll other arguments options are the same as those listed in ingest.\n\nSee also ingest.\n\n\n\n"
},

{
    "location": "apireference.html#Loading-data-1",
    "page": "API Reference",
    "title": "Loading data",
    "category": "section",
    "text": "ingest\ningest!\nloadfiles"
},

{
    "location": "apireference.html#JuliaDB.save",
    "page": "API Reference",
    "title": "JuliaDB.save",
    "category": "Function",
    "text": "save(t::DTable, outputdir::AbstractString)\n\nSaves a DTable to disk. This function blocks till all files data has been computed and saved. Saved data can be loaded with load.\n\nSee also ingest, load\n\n\n\n"
},

{
    "location": "apireference.html#JuliaDB.load",
    "page": "API Reference",
    "title": "JuliaDB.load",
    "category": "Function",
    "text": "load(dir::AbstractString; tomemory)\n\nLoad a saved DTable from dir directory. Data can be saved using ingest or save functions. If tomemory option is true, then data is loaded into memory rather than mmapped.\n\nSee also ingest, save\n\n\n\n"
},

{
    "location": "apireference.html#Saving-and-Loading-tables-1",
    "page": "API Reference",
    "title": "Saving and Loading tables",
    "category": "section",
    "text": "Saving an existing DTable can be accomplished through the use of the save function.  The save function has the following help string:saveLoading a previously saved DTable from disk can be accomplished through use of the load function.  The load function has the following help string:load"
},

{
    "location": "apireference.html#JuliaDB.distribute",
    "page": "API Reference",
    "title": "JuliaDB.distribute",
    "category": "Function",
    "text": "distribute(itable::IndexedTable, rowgroups::AbstractArray)\n\nDistributes an IndexedTable object into a DTable by splitting it up into chunks of rowgroups elements. rowgroups is a vector specifying the number of rows in the chunks.\n\nReturns a DTable.\n\n\n\ndistribute(itable::IndexedTable, nchunks::Int=nworkers())\n\nDistributes an IndexedTable object into a DTable of nchunks chunks of approximately equal size.\n\nReturns a DTable.\n\n\n\n"
},

{
    "location": "apireference.html#distributing-an-IndexedTable-1",
    "page": "API Reference",
    "title": "distributing an IndexedTable",
    "category": "section",
    "text": "distribute"
},

{
    "location": "apireference.html#Dagger.compute-Tuple{JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Dagger.compute",
    "category": "Method",
    "text": "compute(t::DTable; allowoverlap, closed)\n\nComputes any delayed-evaluations in the DTable. The computed data is left on the worker processes. Subsequent operations on the results will reuse the chunks.\n\nIf allowoverlap is false then the computed data is re-sorted if required to have no chunks with overlapping index ranges if necessary.\n\nIf closed is true then the computed data is re-sorted if required to have no chunks with overlapping OR continuous boundaries.\n\nSee also gather.\n\nwarning: Warning\ncompute(t) requires at least as much memory as the size of the result of the computing t. You usually don't need to do this for the whole dataset. If the result is expected to be big, try compute(save(t, \"output_dir\")) instead. See save for more.\n\n\n\n"
},

{
    "location": "apireference.html#Dagger.gather-Tuple{JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Dagger.gather",
    "category": "Method",
    "text": "gather(t::DTable)\n\nGets distributed data in a DTable t and merges it into IndexedTable object\n\nwarning: Warning\ngather(t) requires at least as much memory as the size of the result of the computing t. If the result is expected to be big, try compute(save(t, \"output_dir\")) instead. See save for more. This data can be loaded later using load.\n\n\n\n"
},

{
    "location": "apireference.html#Compute-and-gather-1",
    "page": "API Reference",
    "title": "Compute and gather",
    "category": "section",
    "text": "Operations in JuliaDB are out-of-core in nature. They return DTable objects which can contain parts that are not yet evaluated. compute and gather are ways to force evaluation.compute(t::DTable)gather(t::DTable)"
},

{
    "location": "apireference.html#Base.getindex-Tuple{JuliaDB.DTable,Vararg{Any,N} where N}",
    "page": "API Reference",
    "title": "Base.getindex",
    "category": "Method",
    "text": "t[idx...]\n\nReturns a DTable containing only the elements of t where the given indices (idx) match. If idx has the same type as the index tuple of the t, then this is considered a scalar indexing (indexing of a single value). In this case the value itself is looked up and returned.\n\n\n\n"
},

{
    "location": "apireference.html#Indexing-1",
    "page": "API Reference",
    "title": "Indexing",
    "category": "section",
    "text": "getindex(t::DTable, idx...)"
},

{
    "location": "apireference.html#Base.Sort.select-Tuple{JuliaDB.DTable,Vararg{Pair,N} where N}",
    "page": "API Reference",
    "title": "Base.Sort.select",
    "category": "Method",
    "text": "select(t::DTable, conditions::Pair...)\n\nFilter based on index columns. Conditions are accepted as column-function pairs.\n\nExample: select(t, 1 => x->x>10, 3 => x->x!=10 ...)\n\n\n\n"
},

{
    "location": "apireference.html#Base.Sort.select-Tuple{JuliaDB.DTable,Vararg{Union{Int64, Symbol},N} where N}",
    "page": "API Reference",
    "title": "Base.Sort.select",
    "category": "Method",
    "text": "select(t::DTable, which...; agg)\n\nReturns a new DTable where only a subset of the index columns (specified by which) are kept.\n\nThe agg keyword argument is a function which specifies how entries with equal indices should be aggregated. If agg is unspecified, then the repeating indices are kept in the output, you can then aggregate using aggregate\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.aggregate-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.aggregate",
    "category": "Method",
    "text": "aggregate(f, t::DTable)\n\nCombines adjacent rows with equal indices using the given 2-argument reduction function f.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.aggregate_vec-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.aggregate_vec",
    "category": "Method",
    "text": "aggregate_vec(f::Function, x::DTable)\n\nCombine adjacent rows with equal indices using a function from vector to scalar, e.g. mean.\n\n\n\n"
},

{
    "location": "apireference.html#Base.filter-Tuple{Any,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Base.filter",
    "category": "Method",
    "text": "filter(f, t::DTable)\n\nFilters t removing rows for which f is false. f is passed only the data and not the index.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.convertdim-Tuple{JuliaDB.DTable,Union{Int64, Symbol},Any}",
    "page": "API Reference",
    "title": "IndexedTables.convertdim",
    "category": "Method",
    "text": "convertdim(x::DTable, d::DimName, xlate; agg::Function, name)\n\nApply function or dictionary xlate to each index in the specified dimension. If the mapping is many-to-one, agg is used to aggregate the results. name optionally specifies a name for the new dimension. xlate must be a monotonically increasing function.\n\nSee also reducedim and aggregate\n\n\n\n"
},

{
    "location": "apireference.html#Base.reducedim-Tuple{Any,JuliaDB.DTable,Any}",
    "page": "API Reference",
    "title": "Base.reducedim",
    "category": "Method",
    "text": "reducedim(f, t::DTable, dims)\n\nRemove dims dimensions from t, aggregate any rows with equal indices using 2-argument function f.\n\nSee also reducedim_vec, select and aggregate.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.reducedim_vec-Tuple{Any,JuliaDB.DTable,Any}",
    "page": "API Reference",
    "title": "IndexedTables.reducedim_vec",
    "category": "Method",
    "text": "reducedim_vec(f::Function, t::DTable, dims)\n\nLike reducedim, except uses a function mapping a vector of values to a scalar instead of a 2-argument scalar function.\n\nSee also reducedim and aggregate_vec.\n\n\n\n"
},

{
    "location": "apireference.html#Queries-1",
    "page": "API Reference",
    "title": "Queries",
    "category": "section",
    "text": "select(t::DTable, conditions::Pair...)select(t::DTable, which::JuliaDB.DimName...; agg)aggregate(f, t::DTable)aggregate_vec(f, t::DTable)filter(f, t::DTable)convertdim(t::DTable, d::DimName, xlate; agg::Function, name)reducedim(f, t::DTable, dims)reducedim_vec(f, t::DTable, dims)"
},

{
    "location": "apireference.html#IndexedTables.naturaljoin-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.naturaljoin",
    "category": "Method",
    "text": "naturaljoin(left::DTable, right::DTable, [op])\n\nReturns a new DTable containing only rows where the indices are present both in left AND right tables. The data columns are concatenated.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.leftjoin-Union{Tuple{JuliaDB.DTable{K,V},JuliaDB.DTable}, Tuple{K}, Tuple{V}} where V where K",
    "page": "API Reference",
    "title": "IndexedTables.leftjoin",
    "category": "Method",
    "text": "leftjoin(left::DTable, right::DTable, [op::Function])\n\nKeeps only rows with indices in left. If rows of the same index are present in right, then they are combined using op. op by default picks the value from right.\n\n\n\n"
},

{
    "location": "apireference.html#IndexedTables.asofjoin-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "IndexedTables.asofjoin",
    "category": "Method",
    "text": "asofjoin(left::DTable, right::DTable)\n\nKeeps the indices of left but uses the value from right corresponding to highest index less than or equal to that of left.\n\n\n\n"
},

{
    "location": "apireference.html#Base.merge-Tuple{JuliaDB.DTable,JuliaDB.DTable}",
    "page": "API Reference",
    "title": "Base.merge",
    "category": "Method",
    "text": "merge(left::DTable, right::DTable; agg)\n\nMerges left and right combining rows with matching indices using agg. By default agg picks the value from right.\n\n\n\n"
},

{
    "location": "apireference.html#Joins-1",
    "page": "API Reference",
    "title": "Joins",
    "category": "section",
    "text": "naturaljoin(left::DTable, right::DTable)leftjoin{K,V}(left::DTable{K,V}, right::DTable)asofjoin(left::DTable, right::DTable)merge(left::DTable, right::DTable; agg)"
},

]}
