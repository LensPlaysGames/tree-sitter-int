cmake_minimum_required(VERSION 3.14)
project(tree-sitter-int)

add_library(
  tree-sitter-int
  SHARED
  src/parser.c
)
target_include_directories(
  tree-sitter-int
  PUBLIC
  src
)

if (CMAKE_C_COMPILER_ID STREQUAL "GNU" OR CMAKE_C_COMPILER_ID STREQUAL "Clang")
  target_compile_options(
    tree-sitter-int
    PRIVATE
    -O3
    -march=native
  )
endif()
