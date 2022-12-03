cmake_minimum_required(VERSION 3.14)
project(tree-sitter-un)

add_library(
  tree-sitter-un
  SHARED
  src/parser.c
)

target_include_directories(
  tree-sitter-un
  PUBLIC
  src
)
