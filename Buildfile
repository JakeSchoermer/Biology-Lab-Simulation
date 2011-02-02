# ===========================================================================
# Project:   LabBenchDemo
# Copyright: ¬©2010 My Company, Inc.
# ===========================================================================

# Add initial buildfile information here
config :all, 
	:required => [:sproutcore, :jsx_graph, :raphael]
	
config :lab_bench_admin, :required => [:sproutcore, 'sproutcore/table']


#Set-up Proxy for Node.JS Server
proxy '/api', :to => 'localhost:8124', :url => ''