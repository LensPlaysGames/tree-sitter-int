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

if (CMAKE_C_COMPILER_ID STREQUAL "GNU" OR CMAKE_C_COMPILER_ID STREQUAL "Clang")
  target_compile_options(
    tree-sitter-un
    PRIVATE
    -O3
    -march=native
  )
endif()
