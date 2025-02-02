#!/bin/bash

ssh -L 3306:localhost:3306 -L 5672:localhost:5672 -L 6379:localhost:6379  -L 6380:localhost:6380 dice