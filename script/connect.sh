#!/bin/bash

ssh -L 3307:localhost:3307 -L 3308:localhost:3308 -L 5672:localhost:5672 -L 6379:localhost:6379  -L 6380:localhost:6380 dice